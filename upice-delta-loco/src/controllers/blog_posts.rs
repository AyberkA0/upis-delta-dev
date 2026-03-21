use axum::extract::{Path, State};
use loco_rs::prelude::*;
use serde::{Deserialize, Serialize};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, EntityTrait, QueryOrder, ColumnTrait, QueryFilter};

use crate::models::{
    _entities::blog_posts::{self, Entity as BlogPost},
    users,
};

#[derive(Deserialize)]
pub struct CreatePostParams {
    pub title: String,
    pub content: String,
    pub slug: String,
    pub is_published: Option<bool>,
}

#[derive(Serialize)]
pub struct PostResponse {
    pub id: i32,
    pub title: Option<String>,
    pub content: Option<String>,
    pub slug: Option<String>,
    pub author_id: Option<i32>,
    pub is_published: Option<bool>,
    pub created_at: String,
    pub updated_at: String,
}

impl From<blog_posts::Model> for PostResponse {
    fn from(m: blog_posts::Model) -> Self {
        Self {
            id: m.id,
            title: m.title,
            content: m.content,
            slug: m.slug,
            author_id: m.author_id,
            is_published: m.is_published,
            created_at: m.created_at.to_string(),
            updated_at: m.updated_at.to_string(),
        }
    }
}

pub async fn list_blog_post(State(ctx): State<AppContext>) -> Result<Response> {
    let posts = BlogPost::find()
        .filter(blog_posts::Column::IsPublished.eq(true))
        .order_by_desc(blog_posts::Column::CreatedAt)
        .all(&ctx.db)
        .await?;

    let response: Vec<PostResponse> = posts.into_iter().map(PostResponse::from).collect();
    format::json(response)
}

pub async fn get_one_blog_post(
    State(ctx): State<AppContext>,
    Path(slug): Path<String>,
) -> Result<Response> {
    let post = BlogPost::find()
        .filter(blog_posts::Column::Slug.eq(&slug))
        .filter(blog_posts::Column::IsPublished.eq(true))
        .one(&ctx.db)
        .await?
        .ok_or_else(|| Error::NotFound)?;

    format::json(PostResponse::from(post))
}

pub async fn create_blog_post(
    auth: auth::JWT,
    State(ctx): State<AppContext>,
    Json(params): Json<CreatePostParams>,
) -> Result<Response> {
    let user = users::Model::find_by_pid(&ctx.db, &auth.claims.pid).await?;

    if user.permission_level < 1 {
        return unauthorized("You do not have permission to create blog posts.");
    }

    let post = blog_posts::ActiveModel {
        title: Set(Some(params.title)),
        content: Set(Some(params.content)),
        slug: Set(Some(params.slug)),
        author_id: Set(Some(user.id)),
        is_published: Set(Some(params.is_published.unwrap_or(false))),
        ..Default::default()
    }
    .insert(&ctx.db)
    .await?;

    format::json(PostResponse::from(post))
}

pub async fn delete_blog_post(
    auth: auth::JWT,
    State(ctx): State<AppContext>,
    Path(id): Path<i32>,
) -> Result<Response> {
    let user = users::Model::find_by_pid(&ctx.db, &auth.claims.pid).await?;

    if user.permission_level < 1 {
        return unauthorized("You do not have permission to delete blog posts.");
    }

    BlogPost::delete_by_id(id).exec(&ctx.db).await?;
    format::empty()
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("/api/blog")
        .add("/", get(list_blog_post))
        .add("/{slug}", get(get_one_blog_post))
        .add("/", post(create_blog_post))
        .add("/delete/{id}", delete(delete_blog_post))
}