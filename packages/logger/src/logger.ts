/**
 * Logger: level filter, format, and transport. Injectable, zero config by default.
 */

import { format } from "./format";
import type { LogLevelName } from "./levels";
import { LOG_LEVELS, shouldLog } from "./levels";
import { consoleTransport, type Transport } from "./transport";

export interface LoggerOptions {
	prefix?: string;
	minLevel?: LogLevelName;
	transport?: Transport;
	useColors?: boolean;
	isoTime?: boolean;
}

const DEFAULT_MIN_LEVEL: LogLevelName = "DEBUG";

export function createLogger(options: LoggerOptions = {}) {
	const {
		prefix,
		minLevel = DEFAULT_MIN_LEVEL,
		transport = consoleTransport,
		useColors = true,
		isoTime = false,
	} = options;

	const min = LOG_LEVELS[minLevel];

	function log(level: LogLevelName, message: string, ...args: unknown[]) {
		const levelNum = LOG_LEVELS[level];
		if (!shouldLog(levelNum, min)) return;
		const text = args.length > 0 ? `${message} ${args.map(String).join(" ")}` : message;
		const line = format({ level, message: text, prefix, useColors, isoTime });
		transport(line, level);
	}

	return {
		debug: (msg: string, ...args: unknown[]) => log("DEBUG", msg, ...args),
		info: (msg: string, ...args: unknown[]) => log("INFO", msg, ...args),
		warn: (msg: string, ...args: unknown[]) => log("WARN", msg, ...args),
		error: (msg: string, ...args: unknown[]) => log("ERROR", msg, ...args),
		child: (childPrefix: string) =>
			createLogger({
				prefix: prefix ? `${prefix} › ${childPrefix}` : childPrefix,
				minLevel,
				transport,
				useColors,
				isoTime,
			}),
	};
}

export type Logger = ReturnType<typeof createLogger>;
