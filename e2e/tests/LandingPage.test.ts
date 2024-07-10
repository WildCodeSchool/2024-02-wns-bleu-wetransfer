import { test, expect } from "@playwright/test";

test("Landing page", async ({ page }) => {
  await page.goto("http://frontend:5173/");
  await page.waitForLoadState("networkidle");

  await page.getByPlaceholder("Your email").fill("maxime@gmail.com");
  await page.getByPlaceholder("Email to").fill("you@gmail.com");
  await page.getByPlaceholder("Title").fill("ton document");
  await page.getByPlaceholder("Message").fill("Hello, voici ton document");
});
