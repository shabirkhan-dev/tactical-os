use bcrypt::{hash, verify, DEFAULT_COST};

pub fn hash_password(plain: &str) -> Result<String, bcrypt::BcryptError> {
    hash(plain, DEFAULT_COST)
}

pub fn verify_password(plain: &str, hashed: &str) -> Result<bool, bcrypt::BcryptError> {
    verify(plain, hashed)
}
