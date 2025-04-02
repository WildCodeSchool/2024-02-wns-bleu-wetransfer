import {expect, test} from "@playwright/test";

// Fonction utilitaire pour remplir le formulaire
async function fillRegistrationForm(page, {firstname, lastname, email, password, confirmPassword}) {
	await page.getByPlaceholder('First name').fill(firstname);
	await page.getByPlaceholder('Last name').fill(lastname);
	await page.getByPlaceholder('Email address').fill(email);
	await page.getByTestId('password').fill(password);
	await page.getByTestId('confirmPassword').fill(confirmPassword);
}

test("Test registering new user", async ({page}) => {
	const firstname = "John";
	const lastname = "Doe";
	const email = `john_${Date.now()}@gmail.com`;
	const password = "password123456?";
	const confirmPassword = "password123456?";

	await page.goto("http://apigateway/access/register");

	await fillRegistrationForm(page, {firstname, lastname, email, password, confirmPassword});
	await page.getByTestId('conditions').click();
	await page.getByTestId('registerButton').click();

	await expect(page).toHaveURL("http://apigateway/dashboard");
});

test("Test registering existing user", async ({page}) => {
	const firstname = "Martin";
	const lastname = "Weill";
	const email = "martin@gmail.com";
	const password = "password123456?";
	const confirmPassword = "password123456?";

	await page.goto("http://apigateway/access/register");

	await fillRegistrationForm(page, {firstname, lastname, email, password, confirmPassword});
	await page.getByTestId('conditions').click();
	await page.getByTestId('registerButton').click();

	await expect(page.getByText("You cannot sign up with this email")).toBeVisible();
});

test("Test passwords doesn't match", async ({page}) => {
	const firstname = "John";
	const lastname = "Doe";
	const email = `john_${Date.now()}@gmail.com`;
	const password = "password123456?";
	const confirmPassword = "password?";

	await page.goto("http://apigateway/access/register");

	await fillRegistrationForm(page, {firstname, lastname, email, password, confirmPassword});
	await page.getByTestId('conditions').click();
	await page.getByTestId('registerButton').click();

	await expect(page.getByText("Passwords doesn't match")).toBeVisible();
});
