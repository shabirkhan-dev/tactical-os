//! Format a log line: timestamp, level, optional prefix, message.

use std::time::SystemTime;

use crate::level::{Level, DIM, RESET};

#[derive(Clone)]
pub struct FormatOptions {
	pub level: Level,
	pub prefix: Option<String>,
	pub use_colors: bool,
	pub iso_time: bool,
}

impl Default for FormatOptions {
	fn default() -> Self {
		Self {
			level: Level::Info,
			prefix: None,
			use_colors: true,
			iso_time: false,
		}
	}
}

pub fn format_timestamp(_iso_time: bool) -> String {
	let now = SystemTime::now()
		.duration_since(SystemTime::UNIX_EPOCH)
		.unwrap_or_default();
	let secs = now.as_secs();
	let millis = now.subsec_millis();
	let s = secs % 86400;
	let h = s / 3600;
	let m = (s % 3600) / 60;
	let s = s % 60;
	format!("{:02}:{:02}:{:02}.{:03}", h, m, s, millis)
}

pub fn format_line(opts: &FormatOptions, message: &str) -> String {
	let ts = format_timestamp(opts.iso_time);
	let ts_styled = if opts.use_colors {
		format!("{}{}{}", DIM, ts, RESET)
	} else {
		ts
	};
	let label = opts.level.label();
	let level_styled = if opts.use_colors {
		format!("{}{:5}{}", opts.level.ansi(), label, RESET)
	} else {
		format!("{:5}", label)
	};
	let prefix_part = opts
		.prefix
		.as_deref()
		.map(|p| format!(" {}", p))
		.unwrap_or_default();
	format!("{}  {}{} {}", ts_styled, level_styled, prefix_part, message)
}
