use super::auth_validator::{LoginInput, RegisterInput, SafeUser, SessionDto};
use crate::shared::utils::jwt::{sign_access_token, sign_refresh_token};
use crate::shared::utils::password::{hash_password, verify_password};
use sqlx::PgPool;

pub struct AuthService;

impl AuthService {
    pub async fn register(pool: &PgPool, input: RegisterInput) -> Result<SafeUser, String> {
        let hashed = hash_password(&input.password).map_err(|e| e.to_string())?;

        let row = sqlx::query!(
            r#"
            INSERT INTO users (id, name, email, password, "isEmailVerified", "enable2FA", "emailNotification", "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, false, false, true, NOW(), NOW())
            RETURNING id, name, email, "isEmailVerified", "enable2FA", "emailNotification", "createdAt", "updatedAt"
            "#,
            uuid::Uuid::new_v4().to_string(),
            input.name,
            input.email.trim(),
            hashed
        )
        .fetch_one(pool)
        .await
        .map_err(|e| e.to_string())?;

        Ok(SafeUser {
            id: row.id,
            name: row.name,
            email: row.email,
            is_email_verified: row.isEmailVerified,
            enable_2fa: row.enable2FA,
            email_notification: row.emailNotification,
            created_at: row.createdAt.and_utc(),
            updated_at: row.updatedAt.and_utc(),
        })
    }

    pub async fn login(
        pool: &PgPool,
        input: LoginInput,
        user_agent: &str,
    ) -> Result<(SafeUser, String, String), String> {
        let row = sqlx::query!(
            r#"
            SELECT id, name, email, password, "isEmailVerified", "enable2FA", "emailNotification", "createdAt", "updatedAt"
            FROM users WHERE email = $1
            "#,
            input.email.trim()
        )
        .fetch_optional(pool)
        .await
        .map_err(|e| e.to_string())?;

        let user = row.ok_or_else(|| "Invalid email or password".to_string())?;

        let is_valid = verify_password(&input.password, &user.password).unwrap_or(false);
        if !is_valid {
            return Err("Invalid email or password".to_string());
        }

        let session_id = uuid::Uuid::new_v4().to_string();
        sqlx::query!(
            r#"
            INSERT INTO sessions (id, "userId", "userAgent", "expiredAt", "createdAt")
            VALUES ($1, $2, $3, NOW() + INTERVAL '30 days', NOW())
            "#,
            session_id,
            user.id,
            user_agent
        )
        .execute(pool)
        .await
        .map_err(|e| e.to_string())?;

        let access_token =
            sign_access_token(&user.id, &session_id).map_err(|_| "Token error".to_string())?;
        let refresh_token =
            sign_refresh_token(&session_id).map_err(|_| "Token error".to_string())?;

        let safe_user = SafeUser {
            id: user.id,
            name: user.name,
            email: user.email,
            is_email_verified: user.isEmailVerified,
            enable_2fa: user.enable2FA,
            email_notification: user.emailNotification,
            created_at: user.createdAt.and_utc(),
            updated_at: user.updatedAt.and_utc(),
        };

        Ok((safe_user, access_token, refresh_token))
    }

    pub async fn me(pool: &PgPool, user_id: &str) -> Result<SafeUser, String> {
        let row = sqlx::query!(
            r#"
            SELECT id, name, email, "isEmailVerified", "enable2FA", "emailNotification", "createdAt", "updatedAt"
            FROM users WHERE id = $1
            "#,
            user_id
        )
        .fetch_optional(pool)
        .await
        .map_err(|e| e.to_string())?;

        let user = row.ok_or_else(|| "User not found".to_string())?;

        Ok(SafeUser {
            id: user.id,
            name: user.name,
            email: user.email,
            is_email_verified: user.isEmailVerified,
            enable_2fa: user.enable2FA,
            email_notification: user.emailNotification,
            created_at: user.createdAt.and_utc(),
            updated_at: user.updatedAt.and_utc(),
        })
    }

    pub async fn logout(pool: &PgPool, session_id: &str) -> Result<(), String> {
        sqlx::query!(
            r#"
            DELETE FROM sessions WHERE id = $1
            "#,
            session_id
        )
        .execute(pool)
        .await
        .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub async fn get_sessions(pool: &PgPool, user_id: &str) -> Result<Vec<SessionDto>, String> {
        let rows = sqlx::query!(
            r#"
            SELECT id, "userId", "userAgent", "expiredAt", "createdAt"
            FROM sessions WHERE "userId" = $1 ORDER BY "createdAt" DESC
            "#,
            user_id
        )
        .fetch_all(pool)
        .await
        .map_err(|e| e.to_string())?;

        Ok(rows
            .into_iter()
            .map(|r| SessionDto {
                id: r.id,
                user_id: r.userId,
                user_agent: r.userAgent.unwrap_or_default(),
                expired_at: r.expiredAt.and_utc(),
                created_at: r.createdAt.and_utc(),
            })
            .collect())
    }
}
