use chrono::{DateTime, Duration, Utc};

pub fn thirty_days_from_now() -> DateTime<Utc> {
    Utc::now() + Duration::days(30)
}

pub fn forty_five_minutes_from_now() -> DateTime<Utc> {
    Utc::now() + Duration::minutes(45)
}

pub fn an_hour_from_now() -> DateTime<Utc> {
    Utc::now() + Duration::hours(1)
}

pub fn three_minutes_ago() -> DateTime<Utc> {
    Utc::now() - Duration::minutes(3)
}
