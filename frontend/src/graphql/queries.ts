import {gql} from '@apollo/client'

export const GET_ALL_PLANS = gql`
    query GetAllPlans {
        getAllPlans {
            id,
            name,
            price,
            description,
            is_suggested
        }
    }
`;

export const GET_CONNECTED_USER = gql`
    query GetConnectedUser {
        getConnectedUser {
            isLoggedIn
            email
            role
            firstname
            lastname
        }
    }
`;

export const GET_UPLOAD_BY_USER = gql`
    query GetUploadsByUserId {
        getUploadsByUserId {
            id
            title
            message
            is_activated
            receivers
            created_at
            updated_at
            files {
                id
                file_uid
                name
                default_name
                path
                size
                privacy_status
                type
                created_at
                updated_at
            }
        }
    }`

export const GET_USER_BILLING = gql`
    query GetUserBilling {
        getUserBilling {
            subscription_date
            end_subscription_date
            next_payment_date
            last_payment_date
            plan {
                id
                name
                price
                description
            }
        }
    }
`;

export const GET_USER_FILES = gql`
    query GetUserFiles {
        getUserFiles {
            created_at
            id
            path
            type
            privacy_status
            size
            name
        },
    }
`;

export const GET_USER_SHARED_FILES = gql`
    query  {
        getUserAccessSharedFiles {
            id
            name
            path
            size
            privacy_status
            type
        }
    }
`;