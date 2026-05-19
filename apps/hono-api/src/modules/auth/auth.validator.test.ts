import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./auth.validator";

describe("auth validators", () => {
	it("accepts valid register input", () => {
		const parsed = registerSchema.parse({
			name: "School OS User",
			email: "school-os@example.com",
			password: "super-secret-password",
		});
		expect(parsed.email).toBe("school-os@example.com");
	});

	it("rejects invalid login input", () => {
		expect(() => loginSchema.parse({ email: "bad", password: "" })).toThrow();
	});
});
