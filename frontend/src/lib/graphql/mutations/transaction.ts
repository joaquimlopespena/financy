import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($input: CreateTransactionInput!) {
        createTransaction(input: $input) {
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

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($id: String!, $input: UpdateTransactionInput!) {
        updateTransaction(id: $id, input: $input) {
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

export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($id: String!) {
        deleteTransaction(id: $id)
    }
`;
