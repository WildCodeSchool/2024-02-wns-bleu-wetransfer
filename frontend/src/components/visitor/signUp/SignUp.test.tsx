import { userEvent } from '@vitest/browser/context'
import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing";
import SignUp from './SignUp'
import { BrowserRouter } from 'react-router-dom'
import { SIGN_UP_USER } from "../../../graphql/mutations";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe("Sign up test", () => {
    test('Loading sign up component', async () => {
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
            <BrowserRouter>
                <MockedProvider mocks={mocks} addTypename={false}>
                    <SignUp />
                </MockedProvider>
            </BrowserRouter>
        );

        expect(screen.getByText('Oh, hello there!')).toBeDefined()
        expect(screen.getByText('Already a member?')).toBeDefined()
    });
});
