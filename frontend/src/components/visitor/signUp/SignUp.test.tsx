import {describe, expect, test} from 'vitest'
import {render, screen} from '@testing-library/react'
import {MockedProvider} from "@apollo/client/testing";
import SignUp from './SignUp'
import {BrowserRouter} from 'react-router-dom'
import {SIGN_UP_USER} from "../../../graphql/mutations";

describe("Sign up test", () => {
	test('Loading sign up component', async () => {
		const data = {
			firstname: "Martin",
			lastname: "Weill",
			email: "mawe@gmail.com",
			password: "motDePasse123456?",
			confirmPassword: "motDePasse123456?"
		};
		const mocks = [
			{
				request: {
					query: SIGN_UP_USER,
					variables: {data}
				},
				result: {data: "ok"}
			}
		];
		render(
			<BrowserRouter>
				<MockedProvider mocks={mocks} addTypename={false}>
					<SignUp/>
				</MockedProvider>
			</BrowserRouter>
		);

		expect(screen.getByText('Oh, hello there!')).toBeDefined()
		expect(screen.getByText('Already a member?')).toBeDefined()
	});
});
