import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json-summary", "lcov"],
			reportsDirectory: "./coverage",
			thresholds: {
				lines: 60,
				functions: 55,
				branches: 35,
				statements: 55,
			},
		},
	},
});
