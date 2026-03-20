use crate::{
    mailers::auth::AuthMailer,
    models::{
        _entities::users,
        users::{LoginParams, RegisterParams},
    },
    views::auth::{CurrentResponse, LoginResponse},
};
use loco_rs::prelude::*;
use regex::Regex;
use serde::{Deserialize, Serialize};
use std::sync::OnceLock;

pub static EMAIL_DOMAIN_RE: OnceLock<Regex> = OnceLock::new();

fn get_allow_email_domain_re() -> &'static Regex {
    EMAIL_DOMAIN_RE.get_or_init(|| {
        Regex::new(
            r"^[^+@]+@(gmail\.com|outlook\.com|hotmail\.com|proton\.me|protonmail\.com|pm\.me)$"
        ).expect("Failed to compile regex")
    })
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ForgotParams {
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ResetParams {
    pub token: String,
    pub password: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct MagicLinkParams {
    pub email: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ResendVerificationParams {
    pub email: String,
}

#[debug_handler]
async fn register(
    State(ctx): State<AppContext>,
    Json(params): Json<RegisterParams>,
) -> Result<Response> {
    let res = users::Model::create_with_password(&ctx.db, &params).await;

    let user = match res {
        Ok(user) => user,
        Err(err) => {
            tracing::info!(
                message = err.to_string(),
                user_email = &params.email,
                "registration failed for user",
            );
            return format::json(());
        }
    };

    let user = user
        .into_active_model()
        .set_email_verification_sent(&ctx.db)
        .await?;

    AuthMailer::send_welcome(&ctx, &user).await?;

    format::json(())
}

#[debug_handler]
async fn verify(State(ctx): State<AppContext>, Path(token): Path<String>) -> Result<Response> {
    let Ok(user) = users::Model::find_by_verification_token(&ctx.db, &token).await else {
        return Ok(axum::response::Html(r#"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Geçersiz Token</title>
                <style>
                    body { font-family: monospace; background: #0a0c0f; color: #e8edf5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
                    .box { text-align: center; padding: 48px; border: 1px solid #1e2530; border-radius: 8px; background: #111418; }
                    h1 { color: #ff4757; font-size: 24px; margin-bottom: 12px; }
                    p { color: #5a6a7e; margin-bottom: 24px; }
                    a { color: #00d4a8; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>Geçersiz Token</h1>
                    <p>Bu doğrulama linki geçersiz veya süresi dolmuş.</p>
                    <a href="http://localhost:3000/login">Giriş sayfasına dön</a>
                </div>
            </body>
            </html>
        "#).into_response());
    };

    if user.email_verified_at.is_some() {
        return Ok(axum::response::Html(r#"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Zaten Doğrulandı</title>
                <style>
                    body { font-family: monospace; background: #0a0c0f; color: #e8edf5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
                    .box { text-align: center; padding: 48px; border: 1px solid #1e2530; border-radius: 8px; background: #111418; }
                    h1 { color: #00d4a8; font-size: 24px; margin-bottom: 12px; }
                    p { color: #5a6a7e; margin-bottom: 24px; }
                    a { color: #00d4a8; text-decoration: none; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>Zaten Doğrulandı</h1>
                    <p>Bu hesap zaten doğrulanmış.</p>
                    <a href="http://localhost:3000/login">Giriş yap</a>
                </div>
            </body>
            </html>
        "#).into_response());
    }

    let active_model = user.into_active_model();
    let user = active_model.verified(&ctx.db).await?;
    tracing::info!(pid = user.pid.to_string(), "user verified");

    Ok(axum::response::Html(r#"
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Email Doğrulandı</title>
            <style>
                body { font-family: monospace; background: #0a0c0f; color: #e8edf5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
                .box { text-align: center; padding: 48px; border: 1px solid #1e2530; border-radius: 8px; background: #111418; max-width: 400px; }
                h1 { color: #00d4a8; font-size: 24px; margin-bottom: 12px; }
                p { color: #5a6a7e; margin-bottom: 24px; }
                a { display: inline-block; padding: 10px 24px; background: #00d4a8; color: #000; text-decoration: none; border-radius: 4px; font-weight: 700; }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>✓ Email Doğrulandı</h1>
                <p>Hesabınız başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.</p>
                <a href="http://localhost:3000/login">Giriş Yap</a>
            </div>
        </body>
        </html>
    "#).into_response())
}

#[debug_handler]
async fn forgot(
    State(ctx): State<AppContext>,
    Json(params): Json<ForgotParams>,
) -> Result<Response> {
    let Ok(user) = users::Model::find_by_email(&ctx.db, &params.email).await else {
        // we don't want to expose our users email. if the email is invalid we still
        // returning success to the caller
        return format::json(());
    };

    let user = user
        .into_active_model()
        .set_forgot_password_sent(&ctx.db)
        .await?;

    AuthMailer::forgot_password(&ctx, &user).await?;

    format::json(())
}

#[debug_handler]
async fn reset(State(ctx): State<AppContext>, Json(params): Json<ResetParams>) -> Result<Response> {
    let Ok(user) = users::Model::find_by_reset_token(&ctx.db, &params.token).await else {
        // we don't want to expose our users email. if the email is invalid we still
        // returning success to the caller
        tracing::info!("reset token not found");

        return format::json(());
    };
    user.into_active_model()
        .reset_password(&ctx.db, &params.password)
        .await?;

    format::json(())
}

#[debug_handler]
async fn login(State(ctx): State<AppContext>, Json(params): Json<LoginParams>) -> Result<Response> {
    let Ok(user) = users::Model::find_by_email(&ctx.db, &params.email).await else {
        tracing::debug!(
            email = params.email,
            "login attempt with non-existent email"
        );
        return unauthorized("Invalid credentials!");
    };

    let valid = user.verify_password(&params.password);

    if !valid {
        return unauthorized("unauthorized!");
    }

    if !valid {
        return unauthorized("unauthorized!");
    }

    if user.email_verified_at.is_none() {
        return unauthorized("Please verify your email address before signing in.");
    }

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, jwt_secret.expiration)
        .or_else(|_| unauthorized("unauthorized!"))?;

    format::json(LoginResponse::new(&user, &token))
}

#[debug_handler]
async fn current(auth: auth::JWT, State(ctx): State<AppContext>) -> Result<Response> {
    let user = users::Model::find_by_pid(&ctx.db, &auth.claims.pid).await?;
    format::json(CurrentResponse::new(&user))
}

async fn magic_link(
    State(ctx): State<AppContext>,
    Json(params): Json<MagicLinkParams>,
) -> Result<Response> {
    let email_regex = get_allow_email_domain_re();
    if !email_regex.is_match(&params.email) {
        tracing::debug!(
            email = params.email,
            "The provided email is invalid or does not match the allowed domains"
        );
        return bad_request("invalid request");
    }

    let Ok(user) = users::Model::find_by_email(&ctx.db, &params.email).await else {
        tracing::debug!(email = params.email, "user not found by email");
        return format::empty_json();
    };

    let user = user.into_active_model().create_magic_link(&ctx.db).await?;
    AuthMailer::send_magic_link(&ctx, &user).await?;

    format::empty_json()
}

async fn magic_link_verify(
    Path(token): Path<String>,
    State(ctx): State<AppContext>,
) -> Result<Response> {
    let Ok(user) = users::Model::find_by_magic_token(&ctx.db, &token).await else {
        return unauthorized("unauthorized!");
    };

    let user = user.into_active_model().clear_magic_link(&ctx.db).await?;

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, jwt_secret.expiration)
        .or_else(|_| unauthorized("unauthorized!"))?;

    format::json(LoginResponse::new(&user, &token))
}

#[debug_handler]
async fn resend_verification_email(
    State(ctx): State<AppContext>,
    Json(params): Json<ResendVerificationParams>,
) -> Result<Response> {
    let Ok(user) = users::Model::find_by_email(&ctx.db, &params.email).await else {
        tracing::info!(
            email = params.email,
            "User not found for resend verification"
        );
        return format::json(());
    };

    if user.email_verified_at.is_some() {
        tracing::info!(
            pid = user.pid.to_string(),
            "User already verified, skipping resend"
        );
        return format::json(());
    }

    let user = user
        .into_active_model()
        .set_email_verification_sent(&ctx.db)
        .await?;

    AuthMailer::send_welcome(&ctx, &user).await?;
    tracing::info!(pid = user.pid.to_string(), "Verification email re-sent");

    format::json(())
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("/api/auth")
        .add("/register", post(register))
        .add("/verify/{token}", get(verify))
        .add("/login", post(login))
        .add("/forgot", post(forgot))
        .add("/reset", post(reset))
        .add("/current", get(current))
        .add("/magic-link", post(magic_link))
        .add("/magic-link/{token}", get(magic_link_verify))
        .add("/resend-verification-mail", post(resend_verification_email))
}