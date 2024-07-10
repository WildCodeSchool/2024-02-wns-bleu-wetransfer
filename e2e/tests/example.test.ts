import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
    await page.goto("http://frontend:5173/")

    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Send file casually")).toBeVisible();
});