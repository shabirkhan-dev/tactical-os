import { describe, expect, it } from "vitest";
import app from "./app";

describe("hono app", () => {
	it("returns service metadata on root endpoint", async () => {
		const res = await app.request("/");
		expect(res.status).toBe(200);
		const body = (await res.json()) as {
			success: boolean;
			data: { name: string; version: string };
		};

		expect(body.success).toBe(true);
		expect(body.data.name).toBeTruthy();
		expect(body.data.version).toBeTruthy();
	});

	it("returns health state", async () => {
		const res = await app.request("/health");
		expect(res.status).toBe(200);
		const body = (await res.json()) as {
			success: boolean;
			data: { status: string };
		};
		expect(body.success).toBe(true);
		expect(body.data.status).toBe("ok");
	});
});
