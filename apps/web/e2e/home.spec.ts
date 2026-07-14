import { expect, test } from "@playwright/test";

test("home page renders the atlas hero heading", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { name: /Resolve incidents before/i })).toBeVisible();
});
