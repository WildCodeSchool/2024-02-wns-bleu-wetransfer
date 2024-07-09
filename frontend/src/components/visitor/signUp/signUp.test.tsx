import { userEvent } from '@vitest/browser/context'
import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import SignUp from './SignUp'

describe("Sign up test", () => {
    test('load sign up component', async () => {
        render(<SignUp />);

        const title = await userEvent.click(screen.getByText('Oh, hello there!'))

        expect(title).toContain('Oh, hello there!')
    });
});
