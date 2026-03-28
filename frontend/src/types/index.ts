export interface User {
    id: string
    name: string
    email: string
    role?: string
    createdAt?: string
    updatedAt?: string
}

export interface RegisterInput {
    name: string
    email: string
    password: string
}

export interface LoginInput {
    email: string
    password: string
}

export interface Category {
    id: string
    name: string
    color: string
    icon: string
    description: string
    createdAt: string
    updatedAt: string
}

/** Alinhado ao `CreateCategoryInput` do GraphQL / backend */
export interface CreateCategoryInput {
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
}
