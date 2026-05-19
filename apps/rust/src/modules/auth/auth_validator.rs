use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SafeUser {
    pub id: String,
    pub name: String,
    pub email: String,
    pub is_email_verified: bool,
    pub enable_2fa: bool,
    pub email_notification: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SessionDto {
    pub id: String,
    pub user_id: String,
    pub user_agent: String,
    pub expired_at: DateTime<Utc>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct RegisterInput {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginInput {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Deserialize)]
pub struct VerifyEmailInput {
    pub code: String,
}

#[derive(Debug, Deserialize)]
pub struct ForgotPasswordInput {
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct ResetPasswordInput {
    pub code: String,
    pub new_password: String,
}

#[derive(Debug, Deserialize)]
pub struct Enable2FAInput {
    pub code: String,
    pub secret: String,
}

#[derive(Debug, Deserialize)]
pub struct Disable2FAInput {
    pub password: String,
}
