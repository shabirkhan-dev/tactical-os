import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		globals: true,
		include: ['test/**/*.integration-spec.ts'],
		fileParallelism: false,
		testTimeout: 30_000,
	},
});
