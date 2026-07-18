import { getApiOrigin } from "@/lib/api/client";

/**
 * Rewrite localhost media URLs to the device-reachable API origin
 * (Nest may store absolute URLs based on the request Host header).
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
	if (!url) return null;
	try {
		const parsed = new URL(url);
		if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
			const api = new URL(getApiOrigin());
			parsed.protocol = api.protocol;
			parsed.host = api.host;
			return parsed.toString();
		}
	} catch {
		return url;
	}
	return url;
}
