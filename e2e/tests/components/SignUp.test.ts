import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
    await page.goto("http://frontend:5173/access/register")
    await page.waitForLoadState("networkidle");

    await page.getByPlaceholder('First name').fill('Lucas')
    await page.getByPlaceholder('Last name').fill('Boillot')
    await page.getByPlaceholder('Email address').fill('lucasnimes30000@gmail.com')
    await page.getByTestId('password').fill('123456')
    await page.getByTestId('confirmPassword').fill('123456')
    await page.getByTestId('conditions').click()
    await page.getByTestId('registerButton').click()
});