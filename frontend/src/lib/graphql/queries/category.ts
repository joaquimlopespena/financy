import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
            color
            icon
            description
            createdAt
            updatedAt
            countTransactions
            user {
                id
                name
            }
        }
    }
`;

export const GET_CATEGORY = gql`
    query category($id: String!) {
        category(id: $id) {
            id
            name
            color
            icon
            description
            createdAt
            updatedAt
            countTransactions
            user {
                id
                name
            }
        }
    }
`;