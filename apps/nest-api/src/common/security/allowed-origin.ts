/**
 * Shared browser-origin checks for CORS + CSRF.
 * In development, any http(s) localhost / 127.0.0.1 / [::1] port is allowed
 * so web (:3000), docs (:3002), and Expo (:8081/:8082) all work.
 */
export function isLocalDevOrigin(origin: string): boolean {
	try {
		const url = new URL(origin);
		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			return false;
		}
		return (
			url.hostname === 'localhost' ||
			url.hostname === '127.0.0.1' ||
			url.hostname === '[::1]' ||
			url.hostname === '::1'
		);
	} catch {
		return false;
	}
}

export function isAllowedOrigin(
	origin: string | undefined,
	configuredOrigins: readonly string[],
	isProduction: boolean,
): boolean {
	if (!origin) {
		return true;
	}
	if (configuredOrigins.includes(origin)) {
		return true;
	}
	if (!isProduction && isLocalDevOrigin(origin)) {
		return true;
	}
	return false;
}
