//! Log levels and ANSI colors.

use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Level {
	Debug = 0,
	Info = 1,
	Warn = 2,
	Error = 3,
	None = 4,
}

impl Level {
	pub const fn label(self) -> &'static str {
		match self {
			Level::Debug => "DEBUG",
			Level::Info => "INFO",
			Level::Warn => "WARN",
			Level::Error => "ERROR",
			Level::None => "NONE",
		}
	}

	pub const fn ansi(self) -> &'static str {
		match self {
			Level::Debug => "\x1b[2;36m", // dim cyan
			Level::Info => "\x1b[2;32m",  // dim green
			Level::Warn => "\x1b[1;33m",  // bold yellow
			Level::Error => "\x1b[1;31m", // bold red
			Level::None => "\x1b[0m",
		}
	}

	pub fn should_log(self, min: Level) -> bool {
		(self as u8) >= (min as u8) && self != Level::None
	}
}

impl fmt::Display for Level {
	fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
		write!(f, "{}", self.label())
	}
}

pub const RESET: &str = "\x1b[0m";
pub const DIM: &str = "\x1b[2m";

#[cfg(test)]
mod tests {
	use super::Level;

	#[test]
	fn should_log_respects_min_level() {
		assert!(Level::Info.should_log(Level::Debug));
		assert!(!Level::Debug.should_log(Level::Info));
		assert!(!Level::None.should_log(Level::Debug));
	}
}
