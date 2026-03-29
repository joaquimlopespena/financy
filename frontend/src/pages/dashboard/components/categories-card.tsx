import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBrl } from "@/lib/format";
import type { CategoryTone } from "@/lib/mock";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const categoryBadgeClass: Record<CategoryTone, string> = {
    blue: "border-0 bg-blue-light text-blue-dark hover:bg-blue-light",
    purple: "border-0 bg-purple-light text-purple-dark hover:bg-purple-light",
    orange: "border-0 bg-orange-light text-orange-dark hover:bg-orange-light",
    pink: "border-0 bg-pink-light text-pink-dark hover:bg-pink-light",
    yellow: "border-0 bg-yellow-light text-yellow-dark hover:bg-yellow-light",
    red: "border-0 bg-red-light text-red-dark hover:bg-red-light",
    green: "border-0 bg-green-light text-green-dark hover:bg-green-light",
    mint: "border-0 bg-green-light text-brand-dark hover:bg-green-light",
};

function toCategoryTone(color: string | null | undefined): CategoryTone {
    const c = color ?? "green";
    return c in categoryBadgeClass ? (c as CategoryTone) : "green";
}

interface CategoriesCardProps {
    categories: Category[];
}

export function CategoriesCard({ categories }: CategoriesCardProps) {
    const rows = useMemo(() => {
        return categories.map((cat) => ({
            id: cat.id,
            label: cat.name,
            tone: toCategoryTone(cat.color),
            itemCount: cat.countTransactions,
            total: cat.totalAmount,
        }));
    }, [categories]);

    return (
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
                    <Link to="/categorias" className="flex items-center gap-1">
                        Gerenciar
                        <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="divide-y divide-gray-200 p-0">
                {rows.map((cat) => (
                    <div
                        key={cat.id}
                        className="grid grid-cols-[minmax(0,1fr)_5.5rem_7.5rem] items-center gap-x-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_6.5rem_8.5rem] sm:gap-x-4 sm:px-6"
                    >
                        <div className="min-w-0">
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "inline-flex min-w-0 max-w-full shrink truncate px-2.5 py-1 text-xs font-medium",
                                    categoryBadgeClass[cat.tone],
                                )}
                            >
                                {cat.label}
                            </Badge>
                        </div>
                        <span className="text-center text-sm tabular-nums text-gray-500">
                            {cat.itemCount} {cat.itemCount === 1 ? "item" : "itens"}
                        </span>
                        <span className="text-right text-sm font-bold tabular-nums text-gray-900">
                            {formatBrl(cat.total ?? 0)}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
