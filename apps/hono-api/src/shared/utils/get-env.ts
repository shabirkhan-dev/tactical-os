/**
 * Read env var with optional default. Checks process.env then Bun.env so
 * load-env (which sets process.env when running from monorepo root) is respected.
 */
export function getEnv(key: string): string | undefined;
export function getEnv(key: string, defaultValue: string): string;
export function getEnv(key: string, defaultValue?: string): string | undefined {
	const fromProcess = process.env[key];
	if (fromProcess !== undefined && fromProcess !== "") return fromProcess;
	const fromBun = typeof Bun !== "undefined" && Bun.env ? Bun.env[key] : undefined;
	if (fromBun !== undefined && fromBun !== "") return fromBun;
	return defaultValue;
}

export function requireEnv(key: string): string {
	const value = getEnv(key);
	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`);
	}
	return value;
}
