/*
import { userEvent } from '@vitest/browser/context'
import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing";
import SignUp from './SignUp'
import { SIGN_UP_USER } from "../../../graphql/mutations";

describe("Sign up test", () => {
    test('load sign up component', async () => {
        const data = { firstname: "John", lastname: "Labelette", email: "john@labelette.com", password: "bruh90", confirmPassword: "bruh90" };
        const mocks = [
            {
                request: {
                    query: SIGN_UP_USER,
                    variables: { data }
                },
                result: { data: "ok" }
            }
        ];
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <SignUp />
            </MockedProvider>
        );

        const title = screen.getByText('Oh, hello there!')

        expect(title).toContain('Oh, hello there!')

        await userEvent.click(screen.getByText('Sign up'))


    });
});
*/
