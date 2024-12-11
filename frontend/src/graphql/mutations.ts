import {gql} from "@apollo/client";

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

export const GET_FILES_FROM_UPLOAD = gql`
    mutation GetFilesFromUpload($token: String!) {
        getFilesFromUpload(token: $token) {
            name
            size
            created_at
            default_name
            type
            path
        }
    }
`;

export const CHANGE_PRIVACY_STATUS = gql`
    mutation ChangePrivacyStatus($status: String!, $id: Float!) {
        changePrivacyStatus(status: $status, id: $id)
    }
`;

export const DELETE_FILE = gql`
    mutation DeleteFile($deleteFileId: Float!) {
        deleteFile(id: $deleteFileId)
    }
`

export const EDIT_FILE_NAME = gql`
    mutation EditFileName($newName: String!, $editFileNameId: Float!) {
        editFileName(newName: $newName, id: $editFileNameId)
    }
`
