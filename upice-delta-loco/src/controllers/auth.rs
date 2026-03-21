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
                <title>Invalid Token</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        font-family: 'DM Mono', monospace; 
                        background: #F4F6FA; 
                        color: #0A0A0A; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        min-height: 100vh; 
                    }
                    .container {
                        text-align: center;
                        padding: 40px 24px;
                        max-width: 480px;
                        width: 100%;
                    }
                    .box {
                        background: #fff;
                        border: 1px solid rgba(47,82,133,0.08);
                        border-radius: 20px;
                        padding: 60px 40px;
                        box-shadow: 0 4px 24px rgba(47,82,133,0.06);
                    }
                    .icon {
                        font-size: 48px;
                        margin-bottom: 20px;
                        opacity: 0.3;
                    }
                    h1 {
                        font-family: 'Playfair Display', serif;
                        font-size: 24px;
                        font-weight: 700;
                        color: #dc2626;
                        margin-bottom: 12px;
                    }
                    p {
                        color: #7A6B72;
                        font-size: 13px;
                        line-height: 1.7;
                        margin-bottom: 28px;
                    }
                    a {
                        display: inline-block;
                        padding: 12px 28px;
                        background: rgba(47,82,133,0.08);
                        border: 1px solid rgba(47,82,133,0.15);
                        border-radius: 10px;
                        color: #2F5285;
                        text-decoration: none;
                        font-size: 13px;
                        font-weight: 600;
                        transition: all 0.2s;
                    }
                    a:hover {
                        background: rgba(47,82,133,0.14);
                        border-color: rgba(47,82,133,0.28);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="box">
                        <div class="icon">🔗</div>
                        <h1>Invalid Token</h1>
                        <p>This verification link is invalid or has expired.</p>
                        <a href="http://localhost:3000/login">Back to Login</a>
                    </div>
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
                <title>Already Verified</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: 'DM Mono', monospace; 
                        background: #F4F6FA; 
                        color: #0A0A0A; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        min-height: 100vh; 
                    }
                    .container {
                        text-align: center;
                        padding: 40px 24px;
                        max-width: 480px;
                        width: 100%;
                    }
                    .box {
                        background: #fff;
                        border: 1px solid rgba(47,82,133,0.08);
                        border-radius: 20px;
                        padding: 60px 40px;
                        box-shadow: 0 4px 24px rgba(47,82,133,0.06);
                    }
                    .icon {
                        font-size: 48px;
                        margin-bottom: 20px;
                    }
                    h1 {
                        font-family: 'Playfair Display', serif;
                        font-size: 24px;
                        font-weight: 700;
                        color: #0A0A0A;
                        margin-bottom: 12px;
                    }
                    p {
                        color: #7A6B72;
                        font-size: 13px;
                        line-height: 1.7;
                        margin-bottom: 28px;
                    }
                    a {
                        display: inline-block;
                        padding: 12px 28px;
                        background: rgba(47,82,133,0.08);
                        border: 1px solid rgba(47,82,133,0.15);
                        border-radius: 10px;
                        color: #2F5285;
                        text-decoration: none;
                        font-size: 13px;
                        font-weight: 600;
                        transition: all 0.2s;
                    }
                    a:hover {
                        background: rgba(47,82,133,0.14);
                        border-color: rgba(47,82,133,0.28);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="box">
                        <div class="icon">✓</div>
                        <h1>Already Verified</h1>
                        <p>This account is already verified. You can sign in.</p>
                        <a href="http://localhost:3000/login">Go to Login</a>
                    </div>
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
            <title>Email Verified</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'DM Mono', monospace; 
                    background: #F4F6FA; 
                    color: #0A0A0A; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    min-height: 100vh; 
                }
                .container {
                    text-align: center;
                    padding: 40px 24px;
                    max-width: 480px;
                    width: 100%;
                }
                .box {
                    background: #fff;
                    border: 1px solid rgba(47,82,133,0.08);
                    border-radius: 20px;
                    padding: 60px 40px;
                    box-shadow: 0 4px 24px rgba(47,82,133,0.06);
                }
                .icon {
                    font-size: 48px;
                    margin-bottom: 20px;
                }
                h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: 24px;
                    font-weight: 700;
                    color: #16a34a;
                    margin-bottom: 12px;
                }
                p {
                    color: #7A6B72;
                    font-size: 13px;
                    line-height: 1.7;
                    margin-bottom: 28px;
                }
                a {
                    display: inline-block;
                    padding: 12px 28px;
                    background: rgba(108, 168, 24, 0.5);
                    border: 1px solid rgba(227, 253, 208, 0.5);
                    border-radius: 10px;
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 13px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                a:hover {
                    background: rgba(108, 168, 24, 0.4);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="box">
                    <div class="icon">✓</div>
                    <h1>Email Verified</h1>
                    <p>Your account is verified. You can now sign in and start using Upis Delta.</p>
                    <a href="http://localhost:3000/login">Continue to Login</a>
                </div>
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
        return Ok((
            axum::http::StatusCode::UNAUTHORIZED,
            axum::Json(serde_json::json!({"error": "Invalid email or password."})),
        ).into_response());
    };

    let valid = user.verify_password(&params.password);

    if !valid {
        return Ok((
            axum::http::StatusCode::UNAUTHORIZED,
            axum::Json(serde_json::json!({"error": "Invalid email or password."})),
        ).into_response());
    }

    if user.email_verified_at.is_none() {
        return Ok((
            axum::http::StatusCode::UNAUTHORIZED,
            axum::Json(serde_json::json!({"error": "Please verify your email address before signing in."})),
        ).into_response());
    }

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, jwt_secret.expiration)
        .or_else(|_| unauthorized("jwt error"))?;

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
        return unauthorized("olmadi");
    };

    let user = user.into_active_model().clear_magic_link(&ctx.db).await?;

    let jwt_secret = ctx.config.get_jwt_config()?;

    let token = user
        .generate_jwt(&jwt_secret.secret, jwt_secret.expiration)
        .or_else(|_| unauthorized("olmadi"))?;

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