const SW_URL = "/sw.js";

function setSwStatus(message: string): void {
	const el = document.getElementById("sw-status");
	if (el) el.textContent = message;
}

async function refreshSw(): Promise<void> {
	if (!("serviceWorker" in navigator)) {
		setSwStatus("Service workers are not supported in this browser.");
		return;
	}
	const reg = await navigator.serviceWorker.getRegistration();
	if (!reg) {
		setSwStatus("No service worker registered yet.");
		return;
	}
	const state = reg.active?.state ?? reg.installing?.state ?? reg.waiting?.state ?? "unknown";
	setSwStatus(
		`Service worker: ${state}. ${navigator.onLine ? "Online" : "Offline (cached assets may still work)."}`,
	);
}

export async function registerServiceWorker(): Promise<void> {
	if (!("serviceWorker" in navigator)) {
		setSwStatus("Service workers are not supported.");
		return;
	}
	try {
		const reg = await navigator.serviceWorker.register(SW_URL, { scope: "/" });
		reg.addEventListener("updatefound", () => {
			const worker = reg.installing;
			if (worker) {
				worker.addEventListener("statechange", () => {
					void refreshSw();
				});
			}
		});
		await refreshSw();
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		setSwStatus(`Registration failed: ${msg}`);
	}
}

export function attachServiceWorkerStatusListeners(): void {
	window.addEventListener("online", () => {
		void refreshSw();
	});
	window.addEventListener("offline", () => {
		void refreshSw();
	});
}
