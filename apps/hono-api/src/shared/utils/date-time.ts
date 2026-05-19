/**
 * Date/time helpers for auth (session expiry, verification codes, rate limits).
 */

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function addMs(date: Date, ms: number): Date {
	return new Date(date.getTime() + ms);
}

export function now(): Date {
	return new Date();
}

export function thirtyDaysFromNow(): Date {
	return addMs(now(), 30 * ONE_DAY_MS);
}

export function fortyFiveMinutesFromNow(): Date {
	return addMs(now(), 45 * 60 * 1000);
}

export function anHourFromNow(): Date {
	return addMs(now(), 60 * 60 * 1000);
}

/** Returns a date N minutes ago (for rate-limit windows). */
export function minutesAgo(minutes: number): Date {
	return addMs(now(), -minutes * 60 * 1000);
}

export const threeMinutesAgo = (): Date => minutesAgo(3);

/**
 * Parses a duration string (e.g. "30d", "15m") and returns expiry date from now.
 * Supports: s, m, h, d. Defaults to 30d if invalid.
 */
export function parseExpiresIn(expiresIn: string): Date {
	const match = /^(\d+)(s|m|h|d)$/.exec(expiresIn.trim().toLowerCase());
	if (!match) return thirtyDaysFromNow();
	const value = Number(match[1]);
	const unit = match[2];
	const ms =
		unit === "s"
			? value * 1000
			: unit === "m"
				? value * 60 * 1000
				: unit === "h"
					? value * 60 * 60 * 1000
					: value * ONE_DAY_MS;
	return addMs(now(), ms);
}

/** Parses duration string (e.g. "15m") to seconds for cookie maxAge. */
export function expiresInToSeconds(expiresIn: string): number {
	const match = /^(\d+)(s|m|h|d)$/.exec(expiresIn.trim().toLowerCase());
	if (!match) return 30 * 24 * 60 * 60;
	const value = Number(match[1]);
	const unit = match[2];
	return unit === "s"
		? value
		: unit === "m"
			? value * 60
			: unit === "h"
				? value * 60 * 60
				: value * 24 * 60 * 60;
}
