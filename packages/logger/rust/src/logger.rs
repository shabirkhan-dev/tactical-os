//! Logger: level filter, format, and stdout/stderr. Injectable, zero config by default.

use std::io::{self, Write};

use crate::format::{format_line, FormatOptions};
use crate::level::Level;

pub type Transport = Box<dyn Fn(&str, Level) + Send + Sync>;

fn default_transport(line: &str, level: Level) {
	if level == Level::Error {
		let _ = io::stderr().lock().write_all(line.as_bytes());
		let _ = io::stderr().lock().write_all(b"\n");
	} else {
		let _ = io::stdout().lock().write_all(line.as_bytes());
		let _ = io::stdout().lock().write_all(b"\n");
	}
}

pub struct Logger {
	min_level: Level,
	opts: FormatOptions,
	transport: Option<Transport>,
}

impl Default for Logger {
	fn default() -> Self {
		Self {
			min_level: Level::Debug,
			opts: FormatOptions::default(),
			transport: None,
		}
	}
}

impl Logger {
	pub fn new() -> Self { Self::default() }
	pub fn with_prefix(mut self, prefix: impl Into<String>) -> Self {
		self.opts.prefix = Some(prefix.into());
		self
	}

	pub fn with_min_level(mut self, level: Level) -> Self {
		self.min_level = level;
		self
	}

	pub fn with_transport(mut self, f: Transport) -> Self {
		self.transport = Some(f);
		self
	}

	fn log(&self, level: Level, message: &str) {
		if !level.should_log(self.min_level) {
			return;
		}
		let opts = FormatOptions {
			level,
			prefix: self.opts.prefix.clone(),
			use_colors: self.opts.use_colors,
			iso_time: self.opts.iso_time,
		};
		let line = format_line(&opts, message);
		match &self.transport {
			Some(t) => t(&line, level),
			None => default_transport(&line, level),
		}
	}

	pub fn debug(&self, msg: &str) { self.log(Level::Debug, msg); }
	pub fn info(&self, msg: &str) { self.log(Level::Info, msg); }
	pub fn warn(&self, msg: &str) { self.log(Level::Warn, msg); }
	pub fn error(&self, msg: &str) { self.log(Level::Error, msg); }

	pub fn child(&self, prefix: impl AsRef<str>) -> Logger {
		let child_prefix = match &self.opts.prefix {
			Some(p) => format!("{} › {}", p, prefix.as_ref()),
			None => prefix.as_ref().to_string(),
		};
		Logger {
			min_level: self.min_level,
			opts: FormatOptions {
				level: self.opts.level,
				prefix: Some(child_prefix),
				use_colors: self.opts.use_colors,
				iso_time: self.opts.iso_time,
			},
			transport: None,
		}
	}
}
