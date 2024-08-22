import { test, expect } from "@playwright/test";

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

    await expect(page.locator('.ant-notification-notice-message').first()).toContainText('Success')
});

// Find a way to make this test work on github CI // DB Data doesnt seem to be stored on remote when testing

// test("Test registering existing user", async ({ page }) => {
//     await page.goto("http://apigateway/access/register")
//     await page.waitForLoadState("networkidle");

//     await page.getByPlaceholder('First name').fill('Lucas')
//     await page.getByPlaceholder('Last name').fill('Boillot')
//     await page.getByPlaceholder('Email address').fill(`${r}test@test.com`)
//     await page.getByTestId('password').fill('123456')
//     await page.getByTestId('confirmPassword').fill('123456')
//     await page.getByTestId('conditions').click()
//     await page.getByTestId('registerButton').click()

//     await expect(page.locator('.ant-notification-notice-message').first()).toContainText('Error')
// });