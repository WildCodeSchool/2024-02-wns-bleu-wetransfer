import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test("Landing page", async ({ page }) => {
  await page.goto("http://frontend:5173/");
  await page.waitForLoadState("networkidle");

  const emailInput = page.getByPlaceholder("Your email");
  const emailToInput = page.getByPlaceholder("Email to");
  const titleInput = page.getByPlaceholder("Title");
  const messageInput = page.getByPlaceholder("Message");
  const uploadDragger = page.locator(".ant-upload-drag");
  const transferButton = page.locator('button:has-text("Transfer")');

  await expect(emailInput).toBeVisible();
  await expect(emailToInput).toBeVisible();
  await expect(titleInput).toBeVisible();
  await expect(messageInput).toBeVisible();
  await expect(uploadDragger).toBeVisible();
  await expect(transferButton).toBeVisible();

  await emailInput.fill("maxime@gmail.com");
  await emailToInput.fill("you@gmail.com");
  await titleInput.fill("Ton document");
  await messageInput.fill("Hello, voici ton document");

  const filePath = path.resolve(
    "/Users/maxime/Downloads/MG-fond-noir-jpg-fotor-2024061214914.png"
  );
  console.log("Chemin du fichier:", filePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier n'existe pas: ${filePath}`);
  }

  await transferButton.click();
});
