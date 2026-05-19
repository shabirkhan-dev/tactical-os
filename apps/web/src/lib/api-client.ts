/**
 * API client for Python (FastAPI), Rust (Axum), and Hono backends.
 * Python/Rust: /auth/register, /auth/login, /auth/me with Bearer token.
 * Hono: same paths, cookie-based auth; register uses `name` instead of `username`.
 */
import type { ApiKind, LoginRequest, RegisterRequest, TokenResponse, User } from "./auth-types";

function resolveApiUrl(envKey: string, fallback: string): string {
	const raw =
		typeof process !== "undefined" && process.env[envKey] ? process.env[envKey] : fallback;

	try {
		const url = new URL(raw);
		return url.origin;
	} catch {
		throw new Error(`Invalid URL provided for ${envKey}: ${raw}`);
	}
}

const PYTHON_API = resolveApiUrl("NEXT_PUBLIC_PYTHON_API_URL", "http://localhost:8000");
const RUST_API = resolveApiUrl("NEXT_PUBLIC_RUST_API_URL", "http://localhost:8001");
const HONO_API = resolveApiUrl("NEXT_PUBLIC_HONO_API_URL", "http://localhost:8080");

export function getBaseUrl(api: ApiKind): string {
	if (api === "python") return PYTHON_API;
	if (api === "rust") return RUST_API;
	return HONO_API;
}

/** Hono API wraps responses as { success, code, message, data }. */
interface HonoResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

function isHonoCookieToken(token: string): boolean {
	return token === "cookie" || !token;
}

/** Refresh Hono access token using refresh token cookie. Throws on failure. */
export async function refreshHono(baseUrl: string): Promise<void> {
	const res = await fetch(`${baseUrl}/auth/refresh`, {
		method: "GET",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message = (body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Refresh failed";
		throw new Error(typeof message === "string" ? message : "Refresh failed");
	}
}

/** Logout on Hono: invalidate session and clear cookies. Call with credentials. */
export async function logoutHono(baseUrl: string): Promise<void> {
	const res = await fetch(`${baseUrl}/auth/logout`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) {
		// Best-effort; clear local state even if backend fails
		const body = await res.json().catch(() => ({}));
		const message = (body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Logout failed";
		throw new Error(typeof message === "string" ? message : "Logout failed");
	}
}

async function request<T>(
	baseUrl: string,
	path: string,
	options: RequestInit & { token?: string; useCredentials?: boolean } = {},
): Promise<T> {
	const { token, useCredentials, ...init } = options;
	const headers = new Headers(init.headers);
	headers.set("Content-Type", "application/json");
	if (token && !useCredentials) headers.set("Authorization", `Bearer ${token}`);
	const res = await fetch(`${baseUrl}${path}`, {
		...init,
		headers,
		credentials: useCredentials ? "include" : "same-origin",
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const detail =
			(body as { detail?: string })?.detail ??
			(body as HonoResponse<unknown>)?.message ??
			res.statusText;
		throw new Error(typeof detail === "string" ? detail : "Request failed");
	}
	return res.json() as Promise<T>;
}

/** Normalize Hono user (name, string id) to shared User (username, id number | string). */
function fromHonoUser(u: {
	id: string;
	name: string;
	email: string;
	isEmailVerified: boolean;
	enable2FA?: boolean;
}): User {
	return {
		id: u.id,
		email: u.email,
		username: u.name,
		is_active: u.isEmailVerified,
		...(u.enable2FA !== undefined && { enable2FA: u.enable2FA }),
	};
}

export async function register(api: ApiKind, payload: RegisterRequest): Promise<User> {
	const baseUrl = getBaseUrl(api);
	if (api === "hono") {
		const body = { name: payload.username, email: payload.email, password: payload.password };
		const res = await request<
			HonoResponse<{ user: { id: string; name: string; email: string; isEmailVerified: boolean } }>
		>(baseUrl, "/auth/register", { method: "POST", body: JSON.stringify(body) });
		if (!res.data?.user) throw new Error("Invalid response");
		return fromHonoUser(res.data.user);
	}
	return request<User>(baseUrl, "/auth/register", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function login(api: ApiKind, payload: LoginRequest): Promise<TokenResponse> {
	const baseUrl = getBaseUrl(api);
	if (api === "hono") {
		const res = await request<
			HonoResponse<{
				user: { id: string; name: string; email: string; isEmailVerified: boolean };
				mfaRequired: boolean;
			}>
		>(baseUrl, "/auth/login", {
			method: "POST",
			body: JSON.stringify({ email: payload.email, password: payload.password }),
			useCredentials: true,
		});
		if (!res.data?.user) throw new Error(res.message ?? "Login failed");
		if (res.data.mfaRequired) throw new Error("MFA verification is required");
		// Hono sets cookies; frontend uses a sentinel so me() is called with credentials
		return { access_token: "cookie", token_type: "cookie" };
	}
	return request<TokenResponse>(baseUrl, "/auth/login", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function me(api: ApiKind, token: string): Promise<User> {
	const baseUrl = getBaseUrl(api);
	if (api === "hono" && isHonoCookieToken(token)) {
		const url = `${baseUrl}/auth/me`;
		let res = await fetch(url, {
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		});
		if (res.status === 401) {
			await refreshHono(baseUrl);
			res = await fetch(url, {
				method: "GET",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
			});
		}
		if (!res.ok) {
			const body = await res.json().catch(() => ({}));
			const message =
				(body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Not authenticated";
			throw new Error(typeof message === "string" ? message : "Not authenticated");
		}
		const data = (await res.json()) as HonoResponse<{
			user: {
				id: string;
				name: string;
				email: string;
				isEmailVerified: boolean;
				enable2FA?: boolean;
			};
		}>;
		if (!data.data?.user) throw new Error("Not authenticated");
		return fromHonoUser(data.data.user);
	}
	return request<User>(baseUrl, "/auth/me", { headers: {}, token });
}

// --- Hono-only: sessions and 2FA (use credentials: include) ---

export interface SessionInfo {
	id: string;
	userAgent: string | null;
	createdAt: string;
	expiredAt: string;
	current: boolean;
}

export async function getSessions(baseUrl: string): Promise<{ sessions: SessionInfo[] }> {
	const res = await fetch(`${baseUrl}/auth/sessions`, {
		method: "GET",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message =
			(body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Failed to load sessions";
		throw new Error(typeof message === "string" ? message : "Failed to load sessions");
	}
	const data = (await res.json()) as HonoResponse<{ sessions: SessionInfo[] }>;
	if (!data.data?.sessions) throw new Error("Invalid response");
	return { sessions: data.data.sessions };
}

export async function deleteSession(baseUrl: string, sessionId: string): Promise<void> {
	const res = await fetch(`${baseUrl}/auth/sessions/${encodeURIComponent(sessionId)}`, {
		method: "DELETE",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message =
			(body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Failed to delete session";
		throw new Error(typeof message === "string" ? message : "Failed to delete session");
	}
}

export async function setup2FA(baseUrl: string): Promise<{ secret: string; dataUrl: string }> {
	const res = await fetch(`${baseUrl}/auth/2fa/setup`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message =
			(body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Failed to setup 2FA";
		throw new Error(typeof message === "string" ? message : "Failed to setup 2FA");
	}
	const data = (await res.json()) as HonoResponse<{ secret: string; dataUrl: string }>;
	if (!data.data?.secret || !data.data?.dataUrl) throw new Error("Invalid response");
	return { secret: data.data.secret, dataUrl: data.data.dataUrl };
}

export async function enable2FA(baseUrl: string, code: string): Promise<void> {
	const res = await fetch(`${baseUrl}/auth/2fa/enable`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ code }),
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message =
			(body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Failed to enable 2FA";
		throw new Error(typeof message === "string" ? message : "Failed to enable 2FA");
	}
}

export async function disable2FA(baseUrl: string, password: string): Promise<void> {
	const res = await fetch(`${baseUrl}/auth/2fa/disable`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ password }),
	});
	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		const message =
			(body as HonoResponse<unknown>)?.message ?? res.statusText ?? "Failed to disable 2FA";
		throw new Error(typeof message === "string" ? message : "Failed to disable 2FA");
	}
}
