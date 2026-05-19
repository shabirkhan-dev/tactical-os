import { describe, expect, it } from "vitest";
import { LOG_LEVELS, shouldLog } from "./levels";

describe("shouldLog", () => {
	it("filters based on minimum log level", () => {
		expect(shouldLog(LOG_LEVELS.INFO, LOG_LEVELS.DEBUG)).toBe(true);
		expect(shouldLog(LOG_LEVELS.DEBUG, LOG_LEVELS.INFO)).toBe(false);
		expect(shouldLog(LOG_LEVELS.NONE, LOG_LEVELS.DEBUG)).toBe(false);
	});
});
