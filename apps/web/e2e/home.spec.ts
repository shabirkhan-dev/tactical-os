import { expect, test } from "@playwright/test";

test("home page renders school-os heading", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { name: "School OS" })).toBeVisible();
});
