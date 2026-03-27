import { Briefcase, Car, PiggyBank, ShoppingCart, Utensils, type LucideIcon } from "lucide-react";

export interface Transaction {
    id: string;
    title: string;
    date: string;
    category: string;
    amount: number;
    positive: boolean;
    tone: "green" | "blue" | "purple" | "orange" | "mint";
    Icon: LucideIcon;
}

export type CategoryTone = "blue" | "purple" | "orange" | "pink" | "yellow";

export interface CategorySummary {
    id: string;
    label: string;
    itemCount: number;
    total: number;
    tone: CategoryTone;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: "1",
        title: "Pagamento de Salário",
        date: "01/12/25",
        category: "Receita",
        amount: 4250,
        positive: true,
        tone: "green",
        Icon: Briefcase,
    },
    {
        id: "2",
        title: "Jantar no Restaurante",
        date: "30/11/25",
        category: "Alimentação",
        amount: -89.5,
        positive: false,
        tone: "blue",
        Icon: Utensils,
    },
    {
        id: "3",
        title: "Posto de Gasolina",
        date: "29/11/25",
        category: "Transporte",
        amount: -100,
        positive: false,
        tone: "purple",
        Icon: Car,
    },
    {
        id: "4",
        title: "Compras no Mercado",
        date: "28/11/25",
        category: "Mercado",
        amount: -156.8,
        positive: false,
        tone: "orange",
        Icon: ShoppingCart,
    },
    {
        id: "5",
        title: "Retorno de Investimento",
        date: "26/11/25",
        category: "Investimento",
        amount: 340.25,
        positive: true,
        tone: "mint",
        Icon: PiggyBank,
    },
];

export const MOCK_CATEGORIES: CategorySummary[] = [
    { id: "c1", label: "Alimentação", itemCount: 12, total: 542.3, tone: "blue" },
    { id: "c2", label: "Transporte", itemCount: 8, total: 310.5, tone: "purple" },
    { id: "c3", label: "Mercado", itemCount: 15, total: 892.0, tone: "orange" },
    { id: "c4", label: "Entretenimento", itemCount: 5, total: 245.75, tone: "pink" },
    { id: "c5", label: "Utilidades", itemCount: 4, total: 428.9, tone: "yellow" },
];
