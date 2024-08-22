import {gql} from "@apollo/client";

export const SIGN_UP_USER = gql`
    mutation SignUpUser($password: String!, $email: String!, $firstname: String!, $lastname: String!, $confirmPassword: String!) {
        signUpUser(password: $password, email: $email, firstname: $firstname, lastname: $lastname, confirmPassword: $confirmPassword)
    }
`;


export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;