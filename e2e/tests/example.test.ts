import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
    await page.goto("http://frontend:5173/")

    // bruh
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Send files casually")).toBeVisible();
});