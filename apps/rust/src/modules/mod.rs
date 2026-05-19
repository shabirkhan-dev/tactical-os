pub mod auth;

use axum::Router;
use sqlx::PgPool;

pub fn create_router(pool: PgPool) -> Router {
    Router::new().nest("/auth", auth::auth_routes::routes(pool.clone()))
}
