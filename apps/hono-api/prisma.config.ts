// Prisma 7: connection URL for Migrate/CLI.
import { defineConfig, env } from "prisma/config";

const defaultUrl = "postgresql://hono:hono@localhost:5432/hono";

function getDatasourceUrl(): string {
	try {
		return env("DATABASE_URL");
	} catch {
		return defaultUrl;
	}
}

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: getDatasourceUrl(),
	},
});
