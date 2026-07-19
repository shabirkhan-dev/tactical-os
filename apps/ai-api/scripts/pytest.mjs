#!/usr/bin/env bun
/**
 * Run pytest via uv. Soft-skip when uv is not installed (local hosts without AI toolchain).
 * Real pytest failures still fail the script.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const home = homedir();
const candidates = [
	process.env.UV_BIN,
	"uv",
	join(home, ".local", "bin", "uv.exe"),
	join(home, ".local", "bin", "uv"),
	join(home, ".cargo", "bin", "uv.exe"),
	join(home, ".cargo", "bin", "uv"),
].filter((value) => typeof value === "string" && value.length > 0);

function resolveUv() {
	for (const candidate of candidates) {
		if (candidate === "uv") {
			const probe = spawnSync(candidate, ["--version"], {
				encoding: "utf8",
				shell: process.platform === "win32",
			});
			if (probe.status === 0) {
				return candidate;
			}
			continue;
		}
		if (existsSync(candidate)) {
			return candidate;
		}
	}
	return null;
}

const uv = resolveUv();
if (!uv) {
	console.warn("[ai-api] Skipping pytest: uv unavailable on this host.");
	process.exit(0);
}

const result = spawnSync(uv, ["run", "--group", "dev", "pytest"], {
	stdio: "inherit",
	shell: process.platform === "win32" && uv === "uv",
	env: process.env,
});

process.exit(result.status ?? 1);
