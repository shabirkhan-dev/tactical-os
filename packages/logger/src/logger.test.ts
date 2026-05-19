import { describe, expect, it } from "vitest";
import { createLogger } from "./logger";

describe("createLogger", () => {
	it("writes through custom transport with expected levels", () => {
		const seen: Array<{ line: string; level: string }> = [];
		const logger = createLogger({
			minLevel: "INFO",
			useColors: false,
			transport: (line, level) => seen.push({ line, level }),
		});

		logger.debug("debug");
		logger.info("info");
		logger.error("error");

		expect(seen.map((item) => item.level)).toEqual(["INFO", "ERROR"]);
		expect(seen[0]?.line).toContain("info");
		expect(seen[1]?.line).toContain("error");
	});
});
