import type {
	AuthChallengeResult,
	AuthSession,
	ChangePasswordRequest,
	LoginRequest,
	RegisterRequest,
	RegistrationResult,
	ResetPasswordRequest,
	SessionInfo,
	User,
	VerifyEmailRequest,
} from "./auth-types";

interface NestSuccessResponse<T> {
	success: true;
	statusCode: number;
	data: T;
}

interface NestErrorResponse {
	success: false;
	statusCode: number;
	code?: string;
	message?: string;
	errors?: ReadonlyArray<{ path?: string; message?: string }>;
}

export class ApiError extends Error {
	constructor(
		message: string,
		readonly statusCode: number,
		readonly code: string | undefined,
		readonly issues: NestErrorResponse["errors"],
	) {
		super(message);
		this.name = "ApiError";
	}
}

const NEST_API = resolveApiUrl(process.env.NEXT_PUBLIC_NEST_API_URL ?? "http://localhost:4000");
const API_PREFIX = "/api/v1";

export function getBaseUrl(): string {
	return NEST_API;
}

async function request<T>(
	path: string,
	options: RequestInit & { accessToken?: string } = {},
): Promise<T> {
	const { accessToken, ...init } = options;
	const headers = new Headers(init.headers);
	if (init.body) {
		headers.set("Content-Type", "application/json");
	}
	if (init.method && init.method !== "GET") {
		headers.set("X-Requested-With", "XMLHttpRequest");
	}
	if (accessToken) {
		headers.set("Authorization", `Bearer ${accessToken}`);
	}

	const response = await fetch(`${NEST_API}${API_PREFIX}${normalizePath(path)}`, {
		...init,
		headers,
		credentials: "include",
	});

	if (response.status === 204) {
		return undefined as T;
	}

	const body = (await response.json().catch(() => ({}))) as
		| NestSuccessResponse<T>
		| NestErrorResponse
		| Record<string, unknown>;

	if (!response.ok) {
		const error = body as NestErrorResponse;
		throw new ApiError(
			typeof error.message === "string" ? error.message : response.statusText || "Request failed",
			response.status,
			error.code,
			error.errors,
		);
	}

	if (isSuccessResponse<T>(body)) {
		return body.data;
	}
	return body as T;
}

export function register(payload: RegisterRequest): Promise<RegistrationResult> {
	return request("/auth/register", { method: "POST", body: JSON.stringify(payload) });
}

export function verifyEmail(payload: VerifyEmailRequest): Promise<User> {
	return request("/auth/verify-email", { method: "POST", body: JSON.stringify(payload) });
}

export function resendVerification(email: string): Promise<AuthChallengeResult> {
	return request("/auth/resend-verification", {
		method: "POST",
		body: JSON.stringify({ email }),
	});
}

export function login(payload: LoginRequest): Promise<AuthSession> {
	return request("/auth/login", { method: "POST", body: JSON.stringify(payload) });
}

export function refreshSession(): Promise<AuthSession> {
	return request("/auth/refresh", { method: "POST" });
}

export function logout(): Promise<void> {
	return request("/auth/logout", { method: "POST" });
}

export function logoutAll(accessToken: string): Promise<void> {
	return request("/auth/logout-all", { method: "POST", accessToken });
}

export function me(accessToken: string): Promise<User> {
	return request("/auth/me", { method: "GET", accessToken });
}

export function forgotPassword(email: string): Promise<AuthChallengeResult> {
	return request("/auth/forgot-password", {
		method: "POST",
		body: JSON.stringify({ email }),
	});
}

export function resetPassword(payload: ResetPasswordRequest): Promise<AuthChallengeResult> {
	return request("/auth/reset-password", { method: "POST", body: JSON.stringify(payload) });
}

export function changePassword(
	accessToken: string,
	payload: ChangePasswordRequest,
): Promise<AuthChallengeResult> {
	return request("/auth/change-password", {
		method: "POST",
		body: JSON.stringify(payload),
		accessToken,
	});
}

export function listSessions(accessToken: string): Promise<SessionInfo[]> {
	return request("/auth/sessions", { method: "GET", accessToken });
}

export function revokeSession(accessToken: string, sessionId: string): Promise<{ revoked: true }> {
	return request(`/auth/sessions/${encodeURIComponent(sessionId)}`, {
		method: "DELETE",
		accessToken,
	});
}

function resolveApiUrl(raw: string): string {
	try {
		return new URL(raw).origin;
	} catch {
		throw new Error(`Invalid NEXT_PUBLIC_NEST_API_URL: ${raw}`);
	}
}

function normalizePath(path: string): string {
	return path.startsWith("/") ? path : `/${path}`;
}

function isSuccessResponse<T>(body: unknown): body is NestSuccessResponse<T> {
	return (
		typeof body === "object" &&
		body !== null &&
		"success" in body &&
		body.success === true &&
		"data" in body
	);
}
