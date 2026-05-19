import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	test: {
		include: ["src/**/*.test.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json-summary", "lcov"],
			reportsDirectory: "./coverage",
			include: [
				"src/app.ts",
				"src/modules/auth/auth.validator.ts",
				"src/shared/utils/date-time.ts",
			],
			thresholds: {
				lines: 75,
				functions: 55,
				branches: 60,
				statements: 75,
			},
		},
	},
});
