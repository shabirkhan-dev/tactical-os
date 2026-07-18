import type { Request } from 'express';

/** Clients that cannot use httpOnly cookies (Expo / React Native). */
export const NATIVE_CLIENT_HEADER = 'x-client-platform';
export const NATIVE_CLIENT_VALUE = 'native';

export function isNativeClient(request: Request): boolean {
	const raw = request.headers[NATIVE_CLIENT_HEADER];
	const value = Array.isArray(raw) ? raw[0] : raw;
	return typeof value === 'string' && value.trim().toLowerCase() === NATIVE_CLIENT_VALUE;
}
