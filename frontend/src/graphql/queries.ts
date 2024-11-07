import {gql} from '@apollo/client'

export const GET_ALL_PLANS = gql`
    query GetAllPlans {
        getAllPlans {
            id,
            name,
            price,
            description
        }
    }
`;

export const GET_CONNECTED_USER = gql`
    query GetConnectedUser {
        getConnectedUser {
            email,
            firstname,
            lastname,
            role,
            isLoggedIn,
        }
    }
`;

export const GET_USER_BILLING = gql`
    query GetUserBilling {
        getUserBilling {
            subscription_date
            end_subscription_date
            next_payment_date
            last_payment_date
            plan {
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
            status
            size
            name
        },
    }
`;

export const GET_USER_SHARED_FILES = gql`
    query Query($userId: Float!) {
       getUserAccessSharedFiles(userId: $userId) {
			    id
			    name
			    path
			    size
			    status
			    type
			  }
    }
`;