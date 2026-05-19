import { describe, expect, it } from "vitest";
import { format } from "./format";

describe("format", () => {
	it("formats log line without colors when disabled", () => {
		const line = format({
			level: "INFO",
			message: "hello world",
			prefix: "api",
			useColors: false,
		});

		expect(line).toContain("INFO ");
		expect(line).toContain(" api hello world");
		expect(line).not.toContain("\u001b[");
	});
});
