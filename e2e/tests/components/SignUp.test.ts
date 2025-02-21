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
	const firstname: string = "Martin"
	const lastname: string = "Weill"
	const email: string = "martin@gmail.com"
	const password: string = "123456"
	const confirmPassword: string = "123456"

	await page.goto("http://localhost:7002/access/register")
	await page.waitForLoadState("networkidle");

	await page.getByPlaceholder('First name').fill(firstname)
	await page.getByPlaceholder('Last name').fill(lastname)
	await page.getByPlaceholder('Email address').fill(email)
	await page.getByTestId('password').fill(password)
	await page.getByTestId('confirmPassword').fill(confirmPassword)
	await page.getByTestId('conditions').click()
	await page.getByTestId('registerButton').click()

	await page.waitForLoadState("networkidle");
	await expect(page.getByText("You cannot sign up with this email")).toBeVisible();
});

test("Test passwords doesn't match", async ({page}) => {
	const firstname: string = "John"
	const lastname: string = "Doe"
	const email: string = "john.doe@gmail.com"
	const password: string = "password123456?"
	const confirmPassword: string = "password?"

	await page.goto("http://localhost:7002/access/register")
	await page.waitForLoadState("networkidle");

	await page.getByPlaceholder('First name').fill(firstname)
	await page.getByPlaceholder('Last name').fill(lastname)
	await page.getByPlaceholder('Email address').fill(email)
	await page.getByTestId('password').fill(password)
	await page.getByTestId('confirmPassword').fill(confirmPassword)

	await page.waitForLoadState("networkidle");
	await expect(page.getByText("Passwords doesn't match")).toBeVisible();
})