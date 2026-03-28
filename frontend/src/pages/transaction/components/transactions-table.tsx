import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatBrl } from "@/lib/format";
import type { Transaction } from "@/types";
import { cn } from "@/lib/utils";
import {
    ArrowDown,
    ArrowUp,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Pencil,
    Trash2,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CATEGORY_ICON_OPTIONS } from "@/pages/category/components/category-icon-picker";

const TABLE_TONES = ["green", "blue", "purple", "orange", "mint"] as const;
type TableTone = (typeof TABLE_TONES)[number];

const toneIconBox: Record<TableTone, string> = {
    green: "bg-green-light text-green-dark",
    blue: "bg-blue-light text-blue-dark",
    purple: "bg-purple-light text-purple-dark",
    orange: "bg-orange-light text-orange-dark",
    mint: "bg-green-light text-green-dark",
};

const toneBadge: Record<TableTone, string> = {
    green: "border-0 bg-green-light text-green-dark",
    blue: "border-0 bg-blue-light text-blue-dark",
    purple: "border-0 bg-purple-light text-purple-dark",
    orange: "border-0 bg-orange-light text-orange-dark",
    mint: "border-0 bg-green-light text-green-dark",
};

function toTableTone(color: string): TableTone {
    return (TABLE_TONES as readonly string[]).includes(color) ? (color as TableTone) : "green";
}

function formatTransactionDate(iso: string): string {
    try {
        return format(parseISO(iso), "dd/MM/yyyy", { locale: ptBR });
    } catch {
        return iso;
    }
}

function isIncomeType(type: string): boolean {
    return type.toUpperCase() === "INCOME";
}

const COLUMNS = ["Descrição", "Data", "Categoria", "Tipo", "Valor", "Ações"] as const;

interface TransactionsTableProps {
    transactions: Transaction[];
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
    const total = transactions.length;
    const start = total === 0 ? 0 : 1;
    const end = total;

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-white">
                            {COLUMNS.map((col) => (
                                <th
                                    key={col}
                                    scope="col"
                                    className={cn(
                                        "px-4 py-3 text-xs font-medium tracking-wide text-gray-500 uppercase first:pl-6 last:pr-6",
                                        col === "Ações" && "text-right",
                                    )}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => {
                            const CategoryIcon =
                                CATEGORY_ICON_OPTIONS.find((o) => o.id === tx.category.icon)?.Icon ??
                                Briefcase;
                            const tone = toTableTone(tx.category.color);
                            const positive = isIncomeType(tx.type);

                            return (
                                <tr
                                    key={tx.id}
                                    className="border-b border-gray-100 bg-white transition-colors last:border-b-0 hover:bg-gray-50/80"
                                >
                                    <td className="px-4 py-4 align-middle first:pl-6">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div
                                                className={cn(
                                                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                                    toneIconBox[tone],
                                                )}
                                            >
                                                <CategoryIcon
                                                    className="size-5"
                                                    strokeWidth={2}
                                                    aria-hidden
                                                />
                                            </div>
                                            <span className="font-semibold text-gray-900">{tx.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 align-middle text-gray-600 tabular-nums">
                                        {formatTransactionDate(tx.transactionDate)}
                                    </td>
                                    <td className="px-4 py-4 align-middle">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "px-2.5 py-1 text-xs font-medium",
                                                toneBadge[tone],
                                            )}
                                        >
                                            {tx.category.name}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-4 align-middle">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={cn(
                                                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                                                    positive ? "bg-green-light" : "bg-red-light",
                                                )}
                                                aria-hidden
                                            >
                                                {positive ? (
                                                    <ArrowUp
                                                        className="size-3.5 text-green-base"
                                                        strokeWidth={2.5}
                                                    />
                                                ) : (
                                                    <ArrowDown
                                                        className="size-3.5 text-red-base"
                                                        strokeWidth={2.5}
                                                    />
                                                )}
                                            </span>
                                            <span
                                                className={cn(
                                                    "font-medium",
                                                    positive ? "text-green-base" : "text-red-base",
                                                )}
                                            >
                                                {positive ? "Entrada" : "Saída"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 align-middle">
                                        <span className="font-bold tabular-nums text-gray-900">
                                            {positive ? "+" : "−"}{" "}
                                            {formatBrl(Math.abs(tx.amount))}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 align-middle last:pr-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon-sm"
                                                className="shrink-0 border-gray-200 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                aria-label="Excluir transação"
                                            >
                                                <Trash2 className="size-4" strokeWidth={2} />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon-sm"
                                                className="shrink-0 border-gray-200 text-gray-700 hover:bg-gray-50"
                                                aria-label="Editar transação"
                                            >
                                                <Pencil className="size-4" strokeWidth={2} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
                <p className="text-center text-sm text-gray-500 sm:text-left">
                    <span className="tabular-nums">
                        {start} a {end}
                    </span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span>{total} resultados</span>
                </p>
                <nav
                    className="flex items-center justify-center gap-1 sm:justify-end"
                    aria-label="Paginação"
                >
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="border-gray-200"
                        disabled
                        aria-label="Página anterior"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        className="min-w-9 bg-brand-base text-white hover:bg-brand-dark"
                        aria-current="page"
                    >
                        1
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="min-w-9 border-gray-200">
                        2
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="min-w-9 border-gray-200">
                        3
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="border-gray-200"
                        aria-label="Próxima página"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </nav>
            </div>
        </div>
    );
}
