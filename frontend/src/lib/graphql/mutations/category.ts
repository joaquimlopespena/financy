import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($input: CreateCategoryInput!) {
        createCategory(input: $input) {
            id
            name
            color
            icon
            description
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($id: String!, $input: UpdateCategoryInput!) {
        updateCategory(id: $id, input: $input) {
            id
            name
            color
            icon
            description
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_CATEGORY = gql` 
    mutation DeleteCategory($id: String!) {
        deleteCategory(id: $id)
    }
`;
