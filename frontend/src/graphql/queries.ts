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