import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
    mutation SignUpUser($password: String!, $email: String!, $firstname: String!, $lastname: String!, $confirmPassword: String) {
        signUpUser(password: $password, email: $email, firstname: $firstname, lastname: $lastname, confirmPassword: $confirmPassword) {
        lastname
        firstname
        email
        password
        confirmPassword
        }
    }
`;