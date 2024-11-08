import {gql} from "@apollo/client";

export const SIGN_UP_USER = gql`
    mutation SignUpUser($password: String!, $email: String!, $firstname: String!, $lastname: String!, $confirmPassword: String!) {
        signUpUser(password: $password, email: $email, firstname: $firstname, lastname: $lastname, confirmPassword: $confirmPassword)
    }
`;


export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
         email
            role
            firstname
            lastname
            isLoggedIn
        }
    }
`;

export const ADD_FILES_ACCESS_USERS = gql`
    mutation AddFilesAccessUsers($filesId: [Float!]!, $usersToShareTo: [String!]!) {
        addFilesAccessUsers(filesId: $filesId, usersToShareTo: $usersToShareTo)
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;