/**
 * Log levels and their display/color config.
 */

export const LOG_LEVELS = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
	NONE: 4,
} as const;

export type LogLevelName = keyof typeof LOG_LEVELS;

export type LogLevel = (typeof LOG_LEVELS)[LogLevelName];

export const LEVEL_LABELS: Record<LogLevelName, string> = {
	DEBUG: "DEBUG",
	INFO: "INFO",
	WARN: "WARN",
	ERROR: "ERROR",
	NONE: "NONE",
};

/** ANSI: dim, reset, then level colors (cyan, green, yellow, red) */
export const LEVEL_COLORS: Record<LogLevelName, string> = {
	DEBUG: "\u001b[2;36m", // dim cyan
	INFO: "\u001b[2;32m", // dim green
	WARN: "\u001b[1;33m", // bold yellow
	ERROR: "\u001b[1;31m", // bold red
	NONE: "\u001b[0m",
};

export const RESET = "\u001b[0m";
export const DIM = "\u001b[2m";

export function shouldLog(level: LogLevel, minLevel: LogLevel): boolean {
	return level >= minLevel && level < LOG_LEVELS.NONE;
}
