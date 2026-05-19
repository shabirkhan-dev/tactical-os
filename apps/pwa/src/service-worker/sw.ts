const sw = self as unknown as ServiceWorkerGlobalScope;

const CACHE_NAME = "school-os-pwa-v1";
const PRECACHE_URLS = [
	"/",
	"/index.html",
	"/main.js",
	"/main.css",
	"/styles.css",
	"/manifest.webmanifest",
	"/icons/icon.svg",
];

sw.addEventListener("install", (event: ExtendableEvent) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
});

sw.addEventListener("activate", (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(
				keys.map((key) => {
					if (key !== CACHE_NAME) {
						return caches.delete(key);
					}
					return Promise.resolve(true);
				}),
			),
		),
	);
});

sw.addEventListener("fetch", (event: FetchEvent) => {
	if (event.request.method !== "GET") {
		return;
	}
	event.respondWith(
		caches.match(event.request).then((cached) => {
			if (cached) {
				return cached;
			}
			return fetch(event.request).then((response) => {
				if (
					!response ||
					response.status !== 200 ||
					response.type !== "basic" ||
					!response.url.startsWith(sw.location.origin)
				) {
					return response;
				}
				const copy = response.clone();
				caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
				return response;
			});
		}),
	);
});
