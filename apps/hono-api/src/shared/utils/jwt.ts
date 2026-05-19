import * as jose from "jose";
import { appConfig } from "@/shared/configs/app-config";

export interface AccessPayload {
	userId: string;
	sessionId: string;
}

export interface RefreshPayload {
	sessionId: string;
}

const accessSecret = () => new TextEncoder().encode(appConfig.jwt.secret);
const refreshSecret = () => new TextEncoder().encode(appConfig.jwt.refreshSecret);

export function signAccessToken(payload: AccessPayload): Promise<string> {
	return new jose.SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(appConfig.jwt.expiresIn)
		.sign(accessSecret());
}

export function signRefreshToken(payload: RefreshPayload): Promise<string> {
	return new jose.SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(appConfig.jwt.refreshExpiresIn)
		.sign(refreshSecret());
}

export async function verifyAccessToken(token: string): Promise<AccessPayload | null> {
	try {
		const { payload } = await jose.jwtVerify(token, accessSecret());
		const userId = payload.userId as string | undefined;
		const sessionId = payload.sessionId as string | undefined;
		if (typeof userId !== "string" || typeof sessionId !== "string") return null;
		return { userId, sessionId };
	} catch {
		return null;
	}
}

export async function verifyRefreshToken(token: string): Promise<RefreshPayload | null> {
	try {
		const { payload } = await jose.jwtVerify(token, refreshSecret());
		const sessionId = payload.sessionId as string | undefined;
		if (typeof sessionId !== "string") return null;
		return { sessionId };
	} catch {
		return null;
	}
}
