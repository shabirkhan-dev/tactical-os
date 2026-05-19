import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	deleteSession,
	disable2FA,
	enable2FA,
	getBaseUrl,
	getSessions,
	login,
	me,
	register,
	setup2FA,
} from "./api-client";

describe("api client", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	function mockFetchSequence(responses: Array<Response>): void {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => {
				const response = responses.shift();
				if (!response) throw new Error("no mocked response available");
				return response;
			}),
		);
	}

	it("returns expected base urls for each backend", () => {
		expect(getBaseUrl("python")).toContain("localhost:8000");
		expect(getBaseUrl("rust")).toContain("localhost:8001");
		expect(getBaseUrl("hono")).toContain("localhost:8080");
	});

	it("maps hono register response to shared user shape", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(
						JSON.stringify({
							success: true,
							data: {
								user: {
									id: "u_1",
									name: "school-os",
									email: "school-os@example.com",
									isEmailVerified: true,
								},
							},
						}),
					),
			),
		);

		const user = await register("hono", {
			username: "school-os",
			email: "school-os@example.com",
			password: "super-secret-password",
		});

		expect(user.username).toBe("school-os");
		expect(user.is_active).toBe(true);
	});

	it("returns cookie sentinel token for hono login", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(
						JSON.stringify({
							success: true,
							data: {
								user: {
									id: "u_1",
									name: "school-os",
									email: "school-os@example.com",
									isEmailVerified: true,
								},
								mfaRequired: false,
							},
						}),
					),
			),
		);

		const token = await login("hono", {
			email: "school-os@example.com",
			password: "super-secret-password",
		});
		expect(token.access_token).toBe("cookie");
		expect(token.token_type).toBe("cookie");
	});

	it("throws when hono login requires mfa", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(
						JSON.stringify({
							success: true,
							data: {
								user: {
									id: "u_1",
									name: "school-os",
									email: "school-os@example.com",
									isEmailVerified: true,
								},
								mfaRequired: true,
							},
						}),
					),
			),
		);

		await expect(
			login("hono", { email: "school-os@example.com", password: "super-secret-password" }),
		).rejects.toThrow("MFA verification is required");
	});

	it("refreshes and retries /auth/me for hono cookie auth", async () => {
		mockFetchSequence([
			new Response(JSON.stringify({ message: "unauthorized" }), { status: 401 }),
			new Response(JSON.stringify({ success: true }), { status: 200 }),
			new Response(
				JSON.stringify({
					success: true,
					data: {
						user: {
							id: "u_1",
							name: "school-os",
							email: "school-os@example.com",
							isEmailVerified: true,
							enable2FA: false,
						},
					},
				}),
				{ status: 200 },
			),
		]);

		const user = await me("hono", "cookie");
		expect(user.username).toBe("school-os");
		expect(user.enable2FA).toBe(false);
	});

	it("loads, deletes session, and runs 2fa lifecycle endpoints", async () => {
		mockFetchSequence([
			new Response(
				JSON.stringify({
					success: true,
					data: {
						sessions: [{ id: "s1", current: true, createdAt: "", expiredAt: "", userAgent: null }],
					},
				}),
				{ status: 200 },
			),
			new Response(null, { status: 200 }),
			new Response(
				JSON.stringify({
					success: true,
					data: { secret: "abc", dataUrl: "data:image/png;base64,123" },
				}),
				{ status: 200 },
			),
			new Response(null, { status: 200 }),
			new Response(null, { status: 200 }),
		]);

		const sessions = await getSessions(getBaseUrl("hono"));
		expect(sessions.sessions).toHaveLength(1);

		await deleteSession(getBaseUrl("hono"), "s1");
		const setup = await setup2FA(getBaseUrl("hono"));
		expect(setup.secret).toBe("abc");
		await enable2FA(getBaseUrl("hono"), "123456");
		await disable2FA(getBaseUrl("hono"), "super-secret-password");
	});
});
