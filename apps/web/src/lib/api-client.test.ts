import { beforeEach, describe, expect, it, vi } from "vitest";
import { getBaseUrl, login, me, register } from "./api-client";

describe("api client", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("points at the Nest API by default", () => {
		expect(getBaseUrl()).toContain("localhost:4000");
	});

	it("unwraps Nest register envelope", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(
						JSON.stringify({
							success: true,
							statusCode: 201,
							data: {
								id: "u_1",
								email: "school@example.com",
								username: "school",
								is_active: true,
							},
						}),
						{ status: 201 },
					),
			),
		);

		const user = await register({
			username: "school",
			email: "school@example.com",
			password: "super-secret-password",
		});

		expect(user.username).toBe("school");
		expect(user.is_active).toBe(true);
	});

	it("unwraps Nest login envelope", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(
						JSON.stringify({
							success: true,
							statusCode: 200,
							data: {
								access_token: "jwt-token",
								token_type: "Bearer",
								user: {
									id: "u_1",
									email: "school@example.com",
									username: "school",
									is_active: true,
								},
							},
						}),
					),
			),
		);

		const result = await login({
			email: "school@example.com",
			password: "super-secret-password",
		});

		expect(result.access_token).toBe("jwt-token");
		expect(result.user?.username).toBe("school");
	});

	it("calls me with bearer token", async () => {
		const fetchMock = vi.fn(
			async (_url: string, _init?: RequestInit) =>
				new Response(
					JSON.stringify({
						success: true,
						statusCode: 200,
						data: {
							id: "u_1",
							email: "school@example.com",
							username: "school",
							is_active: true,
						},
					}),
				),
		);
		vi.stubGlobal("fetch", fetchMock);

		const user = await me("jwt-token");
		expect(user.email).toBe("school@example.com");
		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining("/api/v1/auth/me"),
			expect.objectContaining({
				headers: expect.any(Headers),
			}),
		);
		const init = fetchMock.mock.calls[0]?.[1];
		expect(init).toBeDefined();
		const headers = init?.headers as Headers;
		expect(headers.get("Authorization")).toBe("Bearer jwt-token");
	});

	it("surfaces Nest error messages", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(
				async () =>
					new Response(
						JSON.stringify({
							success: false,
							statusCode: 401,
							code: "INVALID_CREDENTIALS",
							message: "Invalid email or password",
						}),
						{ status: 401 },
					),
			),
		);

		await expect(
			login({ email: "school@example.com", password: "wrong-password" }),
		).rejects.toThrow("Invalid email or password");
	});
});
