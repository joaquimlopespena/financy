export interface User {
    id: string
    name: string
    email: string
    role?: string | null
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
    id: string;
    name: string;
    color: string;
    icon: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    countTransactions: number;
    user: {
        id: string;
        name: string;
    };
}

/** Alinhado ao `CreateCategoryInput` do GraphQL / backend */
export interface CreateCategoryInput {
    name: string
    description?: string | null
    icon?: string | null
    color?: string | null
}

export interface UpdateCategoryInput {
    name?: string | null
    description?: string | null
    icon?: string | null
    color?: string | null
}

/** Transação como retornada pelas queries GraphQL (categoria parcial na lista). */
export interface Transaction {
    id: string;
    title: string;
    description: string;
    amount: number;
    type: string;
    transactionDate: string;
    category: Pick<Category, "id" | "name" | "color" | "icon">;
}

/** Alinhado ao `CreateTransactionInput` do GraphQL / backend */
export interface CreateTransactionInput {
    title: string;
    description?: string | null;
    amount: number;
    type: string;
    transactionDate: string;
    categoryId: string;
}

export interface UpdateTransactionInput {
    title?: string | null;
    description?: string | null;
    amount?: number | null;
    type?: string | null;
    transactionDate?: string | null;
    categoryId?: string | null;
}
