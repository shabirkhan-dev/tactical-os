export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret';

const durationPattern = /^(\d+)([smhd])$/i;

function durationToSeconds(value: string, fallbackSeconds: number): number {
	const parsed = value.trim().match(durationPattern);
	if (!parsed) {
		return fallbackSeconds;
	}

	const amount = Number.parseInt(parsed[1], 10);
	const unit = parsed[2].toLowerCase();

	switch (unit) {
		case 's':
			return amount;
		case 'm':
			return amount * 60;
		case 'h':
			return amount * 60 * 60;
		case 'd':
			return amount * 60 * 60 * 24;
		default:
			return fallbackSeconds;
	}
}

export const ACCESS_TOKEN_EXPIRES_IN_SECONDS = durationToSeconds(
	process.env.ACCESS_TOKEN_EXPIRES_IN ?? '15m',
	15 * 60,
);
export const REFRESH_TOKEN_EXPIRES_IN_SECONDS = durationToSeconds(
	process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d',
	30 * 24 * 60 * 60,
);
