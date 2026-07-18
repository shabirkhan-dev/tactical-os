import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import type {
	AuthSessionResult,
	ClientAuthSession,
	ClientLoginResult,
	LoginResult,
} from './auth.types';
import { isNativeClient } from './native-client';
import { RefreshCookieService } from './refresh-cookie.service';

export function presentLoginResult(
	auth: AuthService,
	refreshCookie: RefreshCookieService,
	request: Request,
	response: Response,
	result: LoginResult,
): ClientLoginResult {
	if (!('requiresTwoFactor' in result)) {
		refreshCookie.set(response, result.refreshToken);
	}
	return auth.toClientLoginResult(result, isNativeClient(request));
}

export function presentSession(
	auth: AuthService,
	refreshCookie: RefreshCookieService,
	request: Request,
	response: Response,
	result: AuthSessionResult,
): ClientAuthSession {
	refreshCookie.set(response, result.refreshToken);
	return auth.toClientSession(result, isNativeClient(request));
}

export function resolveRefreshToken(
	refreshCookie: RefreshCookieService,
	request: Request,
	bodyToken?: string,
): string {
	return refreshCookie.read(request) ?? bodyToken ?? '';
}
