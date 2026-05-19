import { watch } from "node:fs";
import { join } from "node:path";

const appRoot = join(import.meta.dir, "..");
const indexHtml = join(appRoot, "index.html");

const g = globalThis as typeof globalThis & { __pwaIndexHtmlWatch?: boolean };
if (!g.__pwaIndexHtmlWatch) {
	g.__pwaIndexHtmlWatch = true;
	watch(indexHtml, { persistent: true }, () => {
		console.log("\n[html] index.html changed — refresh the browser.\n");
	});
	console.log(`[html] watching ${indexHtml}`);
}
