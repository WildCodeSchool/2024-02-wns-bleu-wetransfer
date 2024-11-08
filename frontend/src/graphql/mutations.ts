import { gql } from "@apollo/client";

export const SIGN_UP_USER = gql`
	mutation SignUpUser(
		$password: String!
		$email: String!
		$firstname: String!
		$lastname: String!
		$confirmPassword: String!
	) {
		signUpUser(
			password: $password
			email: $email
			firstname: $firstname
			lastname: $lastname
			confirmPassword: $confirmPassword
		)
	}
`;

export const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password)
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

export const GET_FILES_FROM_UPLOAD = gql`
	mutation GetFilesFromUpload($token: String!) {
		getFilesFromUpload(token: $token) {
			name
			size
			created_at
			type
			path
		}
	}
`;
