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

export const GET_PAGINATED_TRANSACTIONS = gql`
    query GetPaginatedTransactions($page: Int!, $limit: Int!) {
        paginte(page: $page, limit: $limit) {
            page
            total
            limit
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
    }
`;
