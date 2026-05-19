"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import * as api from "@/lib/api-client";
import type { ApiKind, LoginRequest, RegisterRequest, User } from "@/lib/auth-types";

const STORAGE_API = "starter-api-kind";
const STORAGE_TOKEN = "starter-auth-token";

interface AuthState {
	api: ApiKind;
	token: string | null;
	user: User | null;
	loading: boolean;
	error: string | null;
}

interface AuthContextValue extends AuthState {
	setApi: (api: ApiKind) => void;
	login: (payload: LoginRequest) => Promise<void>;
	register: (payload: RegisterRequest) => Promise<void>;
	logout: () => void;
	refreshUser: () => Promise<void>;
	clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const VALID_API_KINDS: ApiKind[] = ["python", "rust", "hono"];

function loadStored(): { api: ApiKind; token: string | null } {
	if (typeof window === "undefined") {
		return { api: "python", token: null };
	}
	const apiStored = localStorage.getItem(STORAGE_API) as ApiKind | null;
	const token = localStorage.getItem(STORAGE_TOKEN);
	const api: ApiKind = apiStored && VALID_API_KINDS.includes(apiStored) ? apiStored : "python";
	return { api, token };
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [apiKind, setApiKindState] = useState<ApiKind>("python");
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const setApi = useCallback((next: ApiKind) => {
		setApiKindState(next);
		if (typeof window !== "undefined") localStorage.setItem(STORAGE_API, next);
	}, []);

	const logout = useCallback(async () => {
		if (typeof window !== "undefined" && apiKind === "hono" && token) {
			try {
				await api.logoutHono(api.getBaseUrl("hono"));
			} catch {
				// Best-effort; clear local state regardless
			}
		}
		setToken(null);
		setUser(null);
		if (typeof window !== "undefined") localStorage.removeItem(STORAGE_TOKEN);
	}, [apiKind, token]);

	const fetchUser = useCallback(async (kind: ApiKind, t: string) => {
		const u = await api.me(kind, t);
		setUser(u);
	}, []);

	const refreshUser = useCallback(async () => {
		if (token) {
			const u = await api.me(apiKind, token);
			setUser(u);
		}
	}, [apiKind, token]);

	useEffect(() => {
		const { api: storedApi, token: storedToken } = loadStored();
		setApiKindState(storedApi);
		setToken(storedToken);
		if (storedToken) {
			api
				.me(storedApi, storedToken)
				.then((u) => setUser(u))
				.catch(() => {
					if (typeof window !== "undefined") localStorage.removeItem(STORAGE_TOKEN);
					setToken(null);
				})
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	// Proactive refresh for Hono: refresh access token before expiry (e.g. every 14 min for 15m expiry)
	useEffect(() => {
		if (apiKind !== "hono" || token !== "cookie" || !user) return;
		const intervalMs = 14 * 60 * 1000;
		const id = setInterval(() => {
			api.refreshHono(api.getBaseUrl("hono")).catch(() => {
				// On failure, next me() will 401 and user will be cleared
			});
		}, intervalMs);
		return () => clearInterval(id);
	}, [apiKind, token, user]);

	const login = useCallback(
		async (payload: LoginRequest) => {
			setError(null);
			try {
				const res = await api.login(apiKind, payload);
				const t = res.access_token;
				setToken(t);
				if (typeof window !== "undefined") localStorage.setItem(STORAGE_TOKEN, t);
				await fetchUser(apiKind, t);
			} catch (e) {
				setError(e instanceof Error ? e.message : "Login failed");
				throw e;
			}
		},
		[apiKind, fetchUser],
	);

	const register = useCallback(
		async (payload: RegisterRequest) => {
			setError(null);
			try {
				await api.register(apiKind, payload);
				await login({ email: payload.email, password: payload.password });
			} catch (e) {
				setError(e instanceof Error ? e.message : "Registration failed");
				throw e;
			}
		},
		[apiKind, login],
	);

	const value: AuthContextValue = {
		api: apiKind,
		token,
		user,
		loading,
		error,
		setApi,
		login,
		register,
		logout,
		refreshUser,
		clearError: () => setError(null),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
