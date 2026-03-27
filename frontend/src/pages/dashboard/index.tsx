import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MOCK_TRANSACTIONS } from "@/lib/mock";
import { cn } from "@/lib/utils";
import {
    ArrowDown,
    ArrowUp,
    ChevronRight,
    CircleArrowDown,
    CircleArrowUp,
    PlusCircle,
    Wallet,
} from "lucide-react";

const brl = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

type Tone = "green" | "blue" | "purple" | "orange" | "mint";

const toneIconBox: Record<Tone, string> = {
    green: "bg-green-light text-green-dark",
    blue: "bg-blue-light text-blue-dark",
    purple: "bg-purple-light text-purple-dark",
    orange: "bg-orange-light text-orange-dark",
    mint: "bg-green-light text-green-dark",
};

const toneBadge: Record<Tone, string> = {
    green: "border-0 bg-green-light text-green-dark hover:bg-green-light",
    blue: "border-0 bg-blue-light text-blue-dark hover:bg-blue-light",
    purple: "border-0 bg-purple-light text-purple-dark hover:bg-purple-light",
    orange: "border-0 bg-orange-light text-orange-dark hover:bg-orange-light",
    mint: "border-0 bg-green-light text-green-dark hover:bg-green-light",
};

type CategoryTone = "blue" | "purple" | "orange" | "pink" | "yellow";

const categoryBadgeClass: Record<CategoryTone, string> = {
    blue: "border-0 bg-blue-light text-blue-dark hover:bg-blue-light",
    purple: "border-0 bg-purple-light text-purple-dark hover:bg-purple-light",
    orange: "border-0 bg-orange-light text-orange-dark hover:bg-orange-light",
    pink: "border-0 bg-pink-light text-pink-dark hover:bg-pink-light",
    yellow: "border-0 bg-yellow-light text-yellow-dark hover:bg-yellow-light",
};

const MOCK_CATEGORIES: {
    id: string;
    label: string;
    itemCount: number;
    total: number;
    tone: CategoryTone;
}[] = [
    { id: "c1", label: "Alimentação", itemCount: 12, total: 542.3, tone: "blue" },
    { id: "c2", label: "Transporte", itemCount: 8, total: 310.5, tone: "purple" },
    { id: "c3", label: "Mercado", itemCount: 15, total: 892.0, tone: "orange" },
    { id: "c4", label: "Entretenimento", itemCount: 5, total: 245.75, tone: "pink" },
    { id: "c5", label: "Utilidades", itemCount: 4, total: 428.9, tone: "yellow" },
];

/** Cards de resumo — Figma: padding 24px, gap interno 16px, raio 12px, borda 1px gray-200. */
export default function Dashboard() {
    return (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
                <Card className="h-auto min-h-0 w-full border border-gray-200 bg-white p-6 shadow-sm ring-0">
                    <CardHeader className="gap-4 p-0">
                        <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <Wallet className="size-5 shrink-0 text-purple-base" strokeWidth={2} aria-hidden />
                            Saldo total
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold tracking-tight text-gray-900">
                            R$ 12.847,32
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="h-auto min-h-0 w-full border border-gray-200 bg-white p-6 shadow-sm ring-0">
                    <CardHeader className="gap-4 p-0">
                        <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <CircleArrowUp className="size-5 shrink-0 text-brand-base" strokeWidth={2} aria-hidden />
                            Receitas do mês
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold tracking-tight text-gray-900">
                            R$ 4.250,00
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card className="h-auto min-h-0 w-full border border-gray-200 bg-white p-6 shadow-sm ring-0">
                    <CardHeader className="gap-4 p-0">
                        <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <CircleArrowDown className="size-5 shrink-0 text-red-base" strokeWidth={2} aria-hidden />
                            Despesas do mês
                        </CardTitle>
                        <CardDescription className="text-2xl font-bold tracking-tight text-gray-900">
                            R$ 2.180,45
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:items-start">
                <Card className="min-w-0 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-0">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-6 pb-4 pt-6">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Transações recentes
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto shrink-0 gap-1 px-2 font-semibold text-brand-base hover:bg-transparent hover:text-brand-dark"
                        >
                            Ver todas
                            <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                        </Button>
                    </CardHeader>

                    <CardContent className="divide-y divide-gray-200 p-0">
                        {MOCK_TRANSACTIONS.map((tx) => (
                            <div
                                key={tx.id}
                                className="grid grid-cols-1 items-center gap-3 px-4 py-4 transition-colors hover:bg-gray-50 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-6"
                            >
                                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                    <div
                                        className={cn(
                                            "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                            toneIconBox[tx.tone],
                                        )}
                                    >
                                        <tx.Icon className="size-5" strokeWidth={2} aria-hidden />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900">{tx.title}</p>
                                        <p className="text-xs text-gray-500">{tx.date}</p>
                                    </div>
                                </div>

                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "w-fit justify-self-start px-2.5 py-1 text-xs font-medium lg:justify-self-center",
                                        toneBadge[tx.tone],
                                    )}
                                >
                                    {tx.category}
                                </Badge>

                                <div className="flex items-center justify-end gap-2 justify-self-end pl-[52px] lg:pl-0">
                                    <span className="text-sm font-bold tabular-nums text-gray-900">
                                        {tx.positive ? "+" : "−"} {brl(Math.abs(tx.amount))}
                                    </span>
                                    <span
                                        className={cn(
                                            "flex size-7 shrink-0 items-center justify-center rounded-full",
                                            tx.positive ? "bg-green-light" : "bg-red-light",
                                        )}
                                        aria-hidden
                                    >
                                        {tx.positive ? (
                                            <ArrowUp className="size-3.5 text-green-base" strokeWidth={2.5} />
                                        ) : (
                                            <ArrowDown className="size-3.5 text-red-base" strokeWidth={2.5} />
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </CardContent>

                    <CardFooter className="border-t border-gray-200 p-0">
                        <Button
                            variant="ghost"
                            className="h-auto w-full gap-2 rounded-none py-4 font-semibold text-brand-base hover:bg-gray-50 hover:text-brand-dark"
                        >
                            <PlusCircle className="size-4" strokeWidth={2} aria-hidden />
                            Nova transação
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="min-w-0 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-0">
                    <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-6 pb-4 pt-6">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Categorias
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto shrink-0 gap-1 px-2 font-semibold text-brand-base hover:bg-transparent hover:text-brand-dark"
                        >
                            Gerenciar
                            <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                        </Button>
                    </CardHeader>
                    <CardContent className="divide-y divide-gray-200 p-0">
                        {MOCK_CATEGORIES.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6"
                            >
                                <Badge
                                    variant="secondary"
                                    className={cn(
                                        "max-w-[min(100%,11rem)] truncate px-2.5 py-1 text-xs font-medium",
                                        categoryBadgeClass[cat.tone],
                                    )}
                                >
                                    {cat.label}
                                </Badge>
                                <span className="shrink-0 text-sm text-gray-500">
                                    {cat.itemCount} {cat.itemCount === 1 ? "item" : "itens"}
                                </span>
                                <span className="shrink-0 text-sm font-bold tabular-nums text-gray-900">
                                    {brl(cat.total)}
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
