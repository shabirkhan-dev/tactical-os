import { describe, expect, it } from "vitest";
import { expiresInToSeconds, parseExpiresIn } from "./date-time";

describe("date-time utilities", () => {
	it("converts duration strings to seconds", () => {
		expect(expiresInToSeconds("15m")).toBe(900);
		expect(expiresInToSeconds("2h")).toBe(7200);
		expect(expiresInToSeconds("1d")).toBe(86400);
	});

	it("falls back to 30 days for invalid durations", () => {
		expect(expiresInToSeconds("invalid")).toBe(30 * 24 * 60 * 60);
	});

	it("parses expiresIn to a future date", () => {
		const now = Date.now();
		const parsed = parseExpiresIn("10m").getTime();
		expect(parsed).toBeGreaterThan(now + 9 * 60 * 1000);
		expect(parsed).toBeLessThan(now + 11 * 60 * 1000);
	});
});
