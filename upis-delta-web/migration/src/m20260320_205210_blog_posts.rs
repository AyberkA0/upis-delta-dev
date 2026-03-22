use loco_rs::schema::*;
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, m: &SchemaManager) -> Result<(), DbErr> {
        create_table(m, "blog_posts",
            &[
            
            ("id", ColType::PkAuto),
            
            ("title", ColType::StringNull),
            ("content", ColType::TextNull),
            ("author_id", ColType::IntegerNull),
            ("slug", ColType::StringNull),
            ("is_published", ColType::BooleanNull),
            ],
            &[
            ]
        ).await
    }

    async fn down(&self, m: &SchemaManager) -> Result<(), DbErr> {
        drop_table(m, "blog_posts").await
    }
}
