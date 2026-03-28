import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
    query GetTransaction($id: String!) {
        transaction(id: $id) {
            id
            title
            description
            amount
            type
            transactionDate
            category {
                id
                name
                color
                icon
            }
        }
    }
`;

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
            id
            title
            description
            amount
            type
            transactionDate
            category {
                id
                name
                color
                icon
            }
        }
    }
`;
