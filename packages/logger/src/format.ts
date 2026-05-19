/**
 * Format a single log line: timestamp, level, optional prefix, message.
 */

import type { LogLevelName } from "./levels";
import { DIM, LEVEL_COLORS, LEVEL_LABELS, RESET } from "./levels";

const TIMESTAMP_COLOR = DIM;

export interface FormatOptions {
	level: LogLevelName;
	message: string;
	prefix?: string;
	useColors?: boolean;
	isoTime?: boolean;
}

export function formatTimestamp(isoTime?: boolean): string {
	const now = new Date();
	if (isoTime) return now.toISOString();
	const h = now.getHours().toString().padStart(2, "0");
	const m = now.getMinutes().toString().padStart(2, "0");
	const s = now.getSeconds().toString().padStart(2, "0");
	const ms = now.getMilliseconds().toString().padStart(3, "0");
	return `${h}:${m}:${s}.${ms}`;
}

export function format(options: FormatOptions): string {
	const { level, message, prefix, useColors = true, isoTime = false } = options;
	const ts = formatTimestamp(isoTime);
	const label = LEVEL_LABELS[level];
	const color = useColors ? LEVEL_COLORS[level] : "";
	const tsStyled = useColors ? `${TIMESTAMP_COLOR}${ts}${RESET}` : ts;
	const levelStyled = useColors ? `${color}${label.padEnd(5)}${RESET}` : label.padEnd(5);
	const prefixPart = prefix ? ` ${prefix}` : "";
	return `${tsStyled}  ${levelStyled}${prefixPart} ${message}`;
}
