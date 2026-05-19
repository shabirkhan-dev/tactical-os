import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
	it("merges class names and resolves tailwind conflicts", () => {
		const result = cn("p-2 text-sm", "p-4", false && "hidden", undefined, "font-medium");
		expect(result).toBe("text-sm p-4 font-medium");
	});
});
