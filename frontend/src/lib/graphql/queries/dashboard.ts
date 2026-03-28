import { gql } from "@apollo/client";

export const GET_DASHBOARD = gql`
    query GetDashboard {
        dashboard {
            total_balance
            total_expenses
            total_income
            categories {
                id
                name
                color
                countTransactions
            }
            transactions {
                id
                title
                amount
                type
                transactionDate
                category {
                    id
                    name
                    icon
                    color
                }
            }
        }
    }
`;