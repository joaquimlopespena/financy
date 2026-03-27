import { Briefcase, Car, PiggyBank, ShoppingCart, Utensils, type LucideIcon } from "lucide-react";

interface Transaction {
    id: string;
    title: string;
    date: string;
    category: string;
    amount: number;
    positive: boolean;
    tone: "green" | "blue" | "purple" | "orange" | "mint";
    Icon: LucideIcon;
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
]
