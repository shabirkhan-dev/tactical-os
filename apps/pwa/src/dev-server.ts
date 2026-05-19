import { join } from "node:path";
import "../scripts/watch-html";

const PORT = Number(process.env.PORT) || 3002;
const appRoot = join(import.meta.dir, "..");
const publicDir = join(appRoot, "public");
const srcDir = join(appRoot, "src");
const indexHtml = join(appRoot, "index.html");

const MIME: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".svg": "image/svg+xml",
	".webmanifest": "application/manifest+json",
};

async function bundleMain(): Promise<{ js: ArrayBuffer; css: ArrayBuffer | null }> {
	const result = await Bun.build({
		entrypoints: [join(srcDir, "main.ts")],
		target: "browser",
		minify: false,
		sourcemap: "inline",
	});
	let js: ArrayBuffer | undefined;
	let css: ArrayBuffer | undefined;
	for (const out of result.outputs) {
		if (out.path.endsWith(".js")) {
			js = await out.arrayBuffer();
		} else if (out.path.endsWith(".css")) {
			css = await out.arrayBuffer();
		}
	}
	if (!js) {
		throw new Error("Bundle produced no JS output");
	}
	return { js, css: css ?? null };
}

let mainBundleInFlight: Promise<{ js: ArrayBuffer; css: ArrayBuffer | null }> | null = null;

function getMainBundle(): Promise<{ js: ArrayBuffer; css: ArrayBuffer | null }> {
	if (!mainBundleInFlight) {
		mainBundleInFlight = bundleMain().finally(() => {
			mainBundleInFlight = null;
		});
	}
	return mainBundleInFlight;
}

async function bundleServiceWorker(): Promise<ArrayBuffer> {
	const result = await Bun.build({
		entrypoints: [join(srcDir, "service-worker/sw.ts")],
		target: "browser",
		minify: false,
	});
	const out = result.outputs[0];
	if (!out) {
		throw new Error("Service worker bundle failed");
	}
	return out.arrayBuffer();
}

Bun.serve({
	port: PORT,
	async fetch(req: Request) {
		const url = new URL(req.url);
		const pathname = url.pathname;

		if (pathname === "/") {
			return new Response(Bun.file(indexHtml), {
				headers: { "Content-Type": "text/html; charset=utf-8" },
			});
		}
		if (pathname === "/main.js") {
			try {
				const { js } = await getMainBundle();
				return new Response(js, {
					headers: { "Content-Type": "application/javascript; charset=utf-8" },
				});
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e);
				return new Response(msg, { status: 500 });
			}
		}
		if (pathname === "/main.css") {
			try {
				const { css } = await getMainBundle();
				if (!css) {
					return new Response("No CSS output", { status: 404 });
				}
				return new Response(css, {
					headers: { "Content-Type": "text/css; charset=utf-8" },
				});
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e);
				return new Response(msg, { status: 500 });
			}
		}
		if (pathname === "/sw.js") {
			try {
				const body = await bundleServiceWorker();
				return new Response(body, {
					headers: { "Content-Type": "application/javascript; charset=utf-8" },
				});
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e);
				return new Response(msg, { status: 500 });
			}
		}
		if (pathname === "/styles.css") {
			return new Response(Bun.file(join(srcDir, "styles.css")), {
				headers: { "Content-Type": "text/css; charset=utf-8" },
			});
		}
		if (pathname === "/manifest.webmanifest") {
			const f = Bun.file(join(publicDir, "manifest.webmanifest"));
			if (await f.exists()) {
				return new Response(f, {
					headers: { "Content-Type": "application/manifest+json" },
				});
			}
		}
		if (pathname.startsWith("/icons/")) {
			const rel = pathname.slice(1);
			const f = Bun.file(join(publicDir, rel));
			if (await f.exists()) {
				const ext = rel.slice(rel.lastIndexOf("."));
				const ct = MIME[ext] ?? "application/octet-stream";
				return new Response(f, { headers: { "Content-Type": ct } });
			}
		}

		return new Response("Not Found", { status: 404 });
	},
});

console.log(`PWA dev server http://localhost:${PORT}`);
