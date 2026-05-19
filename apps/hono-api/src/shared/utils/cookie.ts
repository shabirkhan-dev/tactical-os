import type { Context } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { appConfig } from "@/shared/configs/app-config";
import { expiresInToSeconds } from "@/shared/utils/date-time";

/** Path used for refresh-token flow. Clear auth cookies when errors occur here. */
export const REFRESH_PATH = "/auth/refresh";

/** Cookie names to clear on refresh-path errors. Extend when adding new auth cookies. */
const AUTH_COOKIE_NAMES = ["accessToken", "refreshToken"] as const;

const COOKIE_BASE = {
	path: "/",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "Lax" as const,
};

/** Options for access token cookie (short-lived, maxAge matches JWT expiry). */
export function getAccessTokenCookieOptions(): {
	path: string;
	httpOnly: boolean;
	secure: boolean;
	sameSite: "Lax";
	maxAge: number;
} {
	return {
		...COOKIE_BASE,
		secure: process.env.NODE_ENV === "production",
		maxAge: expiresInToSeconds(appConfig.jwt.expiresIn),
	};
}

/** Options for refresh token cookie (long-lived). */
export function getRefreshTokenCookieOptions(): {
	path: string;
	httpOnly: boolean;
	secure: boolean;
	sameSite: "Lax";
	maxAge: number;
} {
	return {
		...COOKIE_BASE,
		secure: process.env.NODE_ENV === "production",
		maxAge: 30 * 24 * 60 * 60,
	};
}

/**
 * Sets access and refresh token cookies on the response.
 */
export function setAuthenticationCookies(
	c: Context,
	opts: { accessToken: string; refreshToken: string },
): void {
	setCookie(c, "accessToken", opts.accessToken, getAccessTokenCookieOptions());
	setCookie(c, "refreshToken", opts.refreshToken, getRefreshTokenCookieOptions());
}

/**
 * Clears authentication cookies on the response. Call on refresh path when
 * returning an error so the client does not keep invalid tokens.
 */
export function clearAuthenticationCookies(c: Context): void {
	for (const name of AUTH_COOKIE_NAMES) {
		deleteCookie(c, name, { path: "/" });
	}
}
