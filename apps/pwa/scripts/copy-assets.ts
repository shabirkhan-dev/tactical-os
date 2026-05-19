import { cpSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const appRoot = join(import.meta.dir, "..");
const dist = join(appRoot, "dist");

mkdirSync(dist, { recursive: true });
cpSync(join(appRoot, "index.html"), join(dist, "index.html"));
cpSync(join(appRoot, "src", "styles.css"), join(dist, "styles.css"));
for (const name of readdirSync(join(appRoot, "public"))) {
	cpSync(join(appRoot, "public", name), join(dist, name), { recursive: true });
}

console.log("Copied index.html, styles.css, and public/ into dist/");
