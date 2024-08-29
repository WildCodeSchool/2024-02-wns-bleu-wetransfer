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
            isLoggedIn
        }
    }
`;