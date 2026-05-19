import { expect, test } from "@playwright/test";

test("home page renders starter heading", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { name: "Starter Kit" })).toBeVisible();
});
