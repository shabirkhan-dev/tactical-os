import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./auth.validator";

describe("auth validators", () => {
	it("accepts valid register input", () => {
		const parsed = registerSchema.parse({
			name: "Starter User",
			email: "starter@example.com",
			password: "super-secret-password",
		});
		expect(parsed.email).toBe("starter@example.com");
	});

	it("rejects invalid login input", () => {
		expect(() => loginSchema.parse({ email: "bad", password: "" })).toThrow();
	});
});
