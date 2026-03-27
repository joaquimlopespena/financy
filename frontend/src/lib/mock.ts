import {
    Activity,
    Briefcase,
    Car,
    Package,
    PiggyBank,
    ShoppingCart,
    Ticket,
    Utensils,
    type LucideIcon,
} from "lucide-react";

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

export type CategoryTone =
    | "blue"
    | "purple"
    | "orange"
    | "pink"
    | "yellow"
    | "red"
    | "green"
    | "mint";

export interface CategorySummary {
    id: string;
    label: string;
    /** Descrição curta para o card de categorias */
    description: string;
    itemCount: number;
    total: number;
    tone: CategoryTone;
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
];

export const MOCK_CATEGORIES: CategorySummary[] = [
    {
        id: "c1",
        label: "Alimentação",
        description: "Restaurantes, delivery e refeições",
        itemCount: 12,
        total: 542.3,
        tone: "blue",
        Icon: Utensils,
    },
    {
        id: "c2",
        label: "Entretenimento",
        description: "Cinema, jogos e lazer",
        itemCount: 2,
        total: 245.75,
        tone: "pink",
        Icon: Ticket,
    },
    {
        id: "c3",
        label: "Investimento",
        description: "Aplicações e retornos financeiros",
        itemCount: 1,
        total: 1200.0,
        tone: "green",
        Icon: PiggyBank,
    },
    {
        id: "c4",
        label: "Mercado",
        description: "Compras de supermercado e mantimentos",
        itemCount: 3,
        total: 892.0,
        tone: "orange",
        Icon: ShoppingCart,
    },
    {
        id: "c5",
        label: "Salário",
        description: "Salários e rendimentos fixos",
        itemCount: 6,
        total: 8500.0,
        tone: "mint",
        Icon: Briefcase,
    },
    {
        id: "c6",
        label: "Saúde",
        description: "Consultas, medicamentos e planos",
        itemCount: 0,
        total: 0,
        tone: "red",
        Icon: Activity,
    },
    {
        id: "c7",
        label: "Transporte",
        description: "Combustível, transporte público e apps",
        itemCount: 8,
        total: 310.5,
        tone: "purple",
        Icon: Car,
    },
    {
        id: "c8",
        label: "Utilidades",
        description: "Contas de casa, internet e serviços",
        itemCount: 4,
        total: 428.9,
        tone: "yellow",
        Icon: Package,
    },
];

export const PERIOD_OPTIONS_2026 = [
    { value: "2026-01", label: "Janeiro / 2026" },
    { value: "2026-02", label: "Fevereiro / 2026" },
    { value: "2026-03", label: "Março / 2026" },
    { value: "2026-04", label: "Abril / 2026" },
    { value: "2026-05", label: "Maio / 2026" },
    { value: "2026-06", label: "Junho / 2026" },
    { value: "2026-07", label: "Julho / 2026" },
    { value: "2026-08", label: "Agosto / 2026" },
    { value: "2026-09", label: "Setembro / 2026" },
    { value: "2026-10", label: "Outubro / 2026" },
    { value: "2026-11", label: "Novembro / 2026" },
    { value: "2026-12", label: "Dezembro / 2026" },
];
