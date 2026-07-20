#!/usr/bin/env bun
/**
 * Nest watch runner that avoids Nest CLI spawning Node with an absolute path.
 * Absolute paths under Windows folders like `R&D` get split on `&` and fail with:
 *   Error: Cannot find module 'C:\Users\...\Documents\R'
 *
 * Also frees PORT before restart so EADDRINUSE does not leave a zombie instance.
 */
import { execSync, spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);

const PORT = Number(process.env.PORT ?? 4000);

/** @type {import("node:child_process").ChildProcess | null} */
let app = null;
/** @type {ReturnType<typeof setTimeout> | null} */
let restartTimer = null;
let starting = false;
let bootedOnce = false;

function log(msg) {
	process.stdout.write(`[nest-dev] ${msg}\n`);
}

function freePort(port) {
	if (process.platform !== "win32") {
		try {
			execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: "ignore" });
		} catch {
			// ignore
		}
		return;
	}

	try {
		const out = execSync("netstat -ano", { encoding: "utf8" });
		const pids = new Set();
		for (const line of out.split(/\r?\n/)) {
			if (!line.includes(`:${port}`) || !line.includes("LISTENING")) continue;
			const parts = line.trim().split(/\s+/);
			const pid = Number(parts.at(-1));
			if (pid > 0) pids.add(pid);
		}
		for (const pid of pids) {
			try {
				execSync(`taskkill /PID ${pid} /T /F`, { stdio: "ignore" });
				log(`freed port ${port} (killed pid ${pid})`);
			} catch {
				// ignore
			}
		}
	} catch {
		// ignore
	}
}

function killApp() {
	return new Promise((resolve) => {
		if (!app || app.killed) {
			app = null;
			resolve();
			return;
		}
		const child = app;
		app = null;
		const done = () => resolve();
		child.once("exit", done);
		try {
			child.kill("SIGTERM");
		} catch {
			done();
			return;
		}
		setTimeout(() => {
			try {
				if (!child.killed) child.kill("SIGKILL");
			} catch {
				// ignore
			}
			done();
		}, 1500);
	});
}

async function startApp() {
	if (starting) return;
	starting = true;
	try {
		await killApp();
		freePort(PORT);

		app = spawn("bun", ["./dist/main.js"], {
			cwd: root,
			stdio: "inherit",
			env: process.env,
			shell: false,
		});

		app.on("error", (err) => {
			log(`app failed to start: ${err.message}`);
		});

		app.on("exit", (code, signal) => {
			if (signal !== "SIGTERM" && signal !== "SIGKILL" && code && code !== 0) {
				log(`app exited code=${code}`);
			}
		});
	} finally {
		starting = false;
	}
}

function scheduleRestart(reason) {
	if (restartTimer) clearTimeout(restartTimer);
	restartTimer = setTimeout(() => {
		restartTimer = null;
		log(`restart (${reason})`);
		void startApp();
	}, 400);
}

log("building (watch)…");

const builder = spawn("bunx", ["nest", "build", "--watch"], {
	cwd: root,
	stdio: ["ignore", "pipe", "pipe"],
	env: process.env,
	shell: true,
});

function onBuilderChunk(chunk) {
	const text = chunk.toString();
	process.stdout.write(text);

	// First successful compile → start once
	if (!bootedOnce && (text.includes("Found 0 errors") || text.includes("Successfully compiled"))) {
		bootedOnce = true;
		scheduleRestart("initial build");
		return;
	}

	// Later rebuilds
	if (bootedOnce && text.includes("File change detected")) {
		scheduleRestart("rebuild");
	}
}

builder.stdout?.on("data", onBuilderChunk);
builder.stderr?.on("data", onBuilderChunk);

builder.on("exit", async (code) => {
	await killApp();
	process.exit(code ?? 1);
});

async function shutdown() {
	if (restartTimer) clearTimeout(restartTimer);
	await killApp();
	if (!builder.killed) builder.kill("SIGTERM");
	process.exit(0);
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());
