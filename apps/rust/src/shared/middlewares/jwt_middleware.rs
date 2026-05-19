use crate::shared::utils::jwt::verify_access_token;
use axum::{
    extract::Request,
    http::{header, StatusCode},
    middleware::Next,
    response::Response,
};
use axum_extra::extract::CookieJar;

#[derive(Clone)]
pub struct AuthContext {
    pub user_id: String,
    pub session_id: String,
}

pub async fn require_jwt(
    jar: CookieJar,
    mut req: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    let token = jar
        .get("accessToken")
        .map(|c| c.value().to_string())
        .or_else(|| {
            req.headers()
                .get(header::AUTHORIZATION)
                .and_then(|h| h.to_str().ok())
                .and_then(|s| s.strip_prefix("Bearer ").map(|s| s.to_string()))
        });

    if let Some(token) = token {
        if let Ok(claims) = verify_access_token(&token) {
            req.extensions_mut().insert(AuthContext {
                user_id: claims.user_id,
                session_id: claims.session_id,
            });
            return Ok(next.run(req).await);
        }
    }

    Err(StatusCode::UNAUTHORIZED)
}
