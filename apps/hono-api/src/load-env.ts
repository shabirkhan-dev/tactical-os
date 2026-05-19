/**
 * Load .env from app root into process.env so config sees it when cwd is monorepo root.
 * Import this first in server.ts (before app/config).
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const cwd = process.cwd();
const envPath = existsSync(resolve(cwd, ".env"))
	? resolve(cwd, ".env")
	: existsSync(resolve(cwd, "apps/hono-api/.env"))
		? resolve(cwd, "apps/hono-api/.env")
		: null;
if (envPath) {
	const content = readFileSync(envPath, "utf-8");
	for (const line of content.split("\n")) {
		const trimmed = line.trim();
		if (trimmed && !trimmed.startsWith("#")) {
			const eq = trimmed.indexOf("=");
			if (eq > 0) {
				const key = trimmed.slice(0, eq).trim();
				let value = trimmed.slice(eq + 1).trim();
				if (
					(value.startsWith('"') && value.endsWith('"')) ||
					(value.startsWith("'") && value.endsWith("'"))
				)
					value = value.slice(1, -1);
				if (!(key in process.env)) process.env[key] = value;
			}
		}
	}
}
