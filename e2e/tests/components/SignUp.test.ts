import { test, expect } from "@playwright/test";
import * as process from 'process'

let r = (Math.random() + 1).toString(36).substring(7);

test("Test registering new user", async ({ page }) => {
    await page.goto("http://apigateway/access/register")
    await page.waitForLoadState("networkidle");

    // Generate a random string so the test always work

    await page.getByPlaceholder('First name').fill(`${r}test`)
    await page.getByPlaceholder('Last name').fill(`${r}`)
    await page.getByPlaceholder('Email address').fill(`${r}test@test.com`)
    await page.getByTestId('password').fill(`${r}`)
    await page.getByTestId('confirmPassword').fill(`${r}`)
    await page.getByTestId('conditions').click()
    await page.getByTestId('registerButton').click()

    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Welcome back, you've been missed !")).toBeVisible();
});

test("Test registering existing user", async ({ page }) => {
    await page.goto("http://apigateway/access/register")
    await page.waitForLoadState("networkidle");

    await page.getByPlaceholder('First name').fill('Lucas')
    await page.getByPlaceholder('Last name').fill('Boillot')
    await page.getByPlaceholder('Email address').fill(`test@test.com`)
    await page.getByTestId('password').fill('123456')
    await page.getByTestId('confirmPassword').fill('123456')
    await page.getByTestId('conditions').click()
    await page.getByTestId('registerButton').click()

    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Error")).toBeVisible();
});