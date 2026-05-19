import { join } from "node:path";

const PORT = Number(process.env.PORT) || 3002;
const root = join(import.meta.dir, "../dist");

const MIME: Record<string, string> = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "application/javascript; charset=utf-8",
	".svg": "image/svg+xml",
	".webmanifest": "application/manifest+json",
	".map": "application/json; charset=utf-8",
};

Bun.serve({
	port: PORT,
	async fetch(req: Request) {
		const url = new URL(req.url);
		const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
		const filePath = join(root, pathname);
		const file = Bun.file(filePath);
		if (!(await file.exists())) {
			return new Response("Not Found", { status: 404 });
		}
		const ext = pathname.slice(pathname.lastIndexOf("."));
		const ct = MIME[ext] ?? "application/octet-stream";
		return new Response(file, { headers: { "Content-Type": ct } });
	},
});

console.log(`PWA (dist) http://localhost:${PORT}`);
