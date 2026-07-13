/**
 * API client for the NestJS School OS backend.
 * Auth: POST /api/v1/auth/register|login, GET /api/v1/auth/me (Bearer JWT).
 */
import type { LoginRequest, RegisterRequest, TokenResponse, User } from "./auth-types";

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
}

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

const NEST_API = resolveApiUrl("NEXT_PUBLIC_NEST_API_URL", "http://localhost:4000");
const API_PREFIX = "/api/v1";

export function getBaseUrl(): string {
	return NEST_API;
}

function apiPath(path: string): string {
	return `${API_PREFIX}${path.startsWith("/") ? path : `/${path}`}`;
}

async function request<T>(
	path: string,
	options: RequestInit & { token?: string } = {},
): Promise<T> {
	const { token, ...init } = options;
	const headers = new Headers(init.headers);
	headers.set("Content-Type", "application/json");
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	const res = await fetch(`${getBaseUrl()}${apiPath(path)}`, {
		...init,
		headers,
	});

	const body = (await res.json().catch(() => ({}))) as
		| NestSuccessResponse<T>
		| NestErrorResponse
		| Record<string, unknown>;

	if (!res.ok) {
		const message =
			typeof (body as NestErrorResponse).message === "string"
				? (body as NestErrorResponse).message
				: res.statusText;
		throw new Error(message || "Request failed");
	}

	if (
		typeof body === "object" &&
		body !== null &&
		"success" in body &&
		(body as NestSuccessResponse<T>).success === true &&
		"data" in body
	) {
		return (body as NestSuccessResponse<T>).data;
	}

	return body as T;
}

export async function register(payload: RegisterRequest): Promise<User> {
	return request<User>("/auth/register", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function login(payload: LoginRequest): Promise<TokenResponse> {
	return request<TokenResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify(payload),
	});
}

export async function me(token: string): Promise<User> {
	return request<User>("/auth/me", {
		method: "GET",
		token,
	});
}
