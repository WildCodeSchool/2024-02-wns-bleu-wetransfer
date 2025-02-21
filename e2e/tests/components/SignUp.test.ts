import {expect, test} from "@playwright/test";


test("Test registering new user", async ({page}) => {
	const firstname: string = "John"
	const lastname: string = "Doe"
	const email: string = "john.doe@gmail.com"
	const password: string = "password123456?"
	const confirmPassword: string = "password123456?"

	await page.goto("http://localhost:7002/access/register")
	await page.waitForLoadState("networkidle");

	await page.getByPlaceholder('First name').fill(firstname)
	await page.getByPlaceholder('Last name').fill(lastname)
	await page.getByPlaceholder('Email address').fill(email)
	await page.getByTestId('password').fill(password)
	await page.getByTestId('confirmPassword').fill(confirmPassword)
	await page.getByTestId('conditions').click()
	await page.getByTestId('registerButton').click()

	await expect(page).toHaveURL("http://localhost:7002/dashboard")
});

test("Test registering existing user", async ({page}) => {
	await page.goto("/access/register")
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