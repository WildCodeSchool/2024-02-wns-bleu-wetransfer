import { test, expect } from "@playwright/test";

// TODO: remettre cette batterie de test quand le composant de connexion sera fait et mis sur la home page ---> cliquer sur le bouton de sign up en arrivant sur la home page

/*
test("Test registering existing user", async ({ page }) => {
    await page.goto("http://apigateway")
    await page.waitForLoadState("networkidle");

    await page.getByPlaceholder('First name').fill('Lucas')
    await page.getByPlaceholder('Last name').fill('Boillot')
    await page.getByPlaceholder('Email address').fill('lucasnimes30000@gmail.com')
    await page.getByTestId('password').fill('123456')
    await page.getByTestId('confirmPassword').fill('123456')
    await page.getByTestId('conditions').click()
    await page.getByTestId('registerButton').click()

    await expect(page.locator('.ant-notification-notice-message').first()).toContainText('Error')
});

test("Test registering new user", async ({ page }) => {
    await page.goto("http://apigateway")
    await page.waitForLoadState("networkidle");

    // Generate a random string so the test always work
    let r = (Math.random() + 1).toString(36).substring(7);

    await page.getByPlaceholder('First name').fill(`${r}test`)
    await page.getByPlaceholder('Last name').fill(`${r}`)
    await page.getByPlaceholder('Email address').fill(`${r}test@test.com`)
    await page.getByTestId('password').fill(`${r}`)
    await page.getByTestId('confirmPassword').fill(`${r}`)
    await page.getByTestId('conditions').click()
    await page.getByTestId('registerButton').click()

    await expect(page.locator('.ant-notification-notice-message').first()).toContainText('Success')
});*/
