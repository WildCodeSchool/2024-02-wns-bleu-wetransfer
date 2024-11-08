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
    isLoggedIn
    email
    role
    firstname
    lastname
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