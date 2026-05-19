import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { HTTP_CODE } from "@/shared/configs/http-config";
import { AppError } from "@/shared/middlewares/app-error";
import { ErrorCode } from "@/shared/errors/error-enum";
import { verifyAccessToken } from "@/shared/utils/jwt";

/** Hono context variables set by JWT middleware. */
export type AuthEnv = {
	userId: string;
	sessionId: string;
};

/**
 * Middleware that verifies the access token (e.g. from cookie or Authorization header)
 * and sets userId and sessionId on the context. Use for protected routes (e.g. logout).
 */
export async function authenticateJWT(c: Context<{ Variables: AuthEnv }>, next: Next) {
	const token =
		c.req.header("Authorization")?.replace(/^Bearer\s+/i, "") ??
		(getCookie(c, "accessToken") as string | undefined);

	if (!token) {
		throw new AppError(
			HTTP_CODE.UNAUTHORIZED,
			"Missing or invalid token",
			undefined,
			ErrorCode.AUTH_TOKEN_NOT_FOUND,
		);
	}

	const payload = await verifyAccessToken(token);
	if (!payload) {
		throw new AppError(
			HTTP_CODE.UNAUTHORIZED,
			"Invalid or expired token",
			undefined,
			ErrorCode.AUTH_INVALID_TOKEN,
		);
	}

	c.set("userId", payload.userId);
	c.set("sessionId", payload.sessionId);
	await next();
}
