import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CATEGORIES, MOCK_TRANSACTIONS } from "@/lib/mock";
import { CategoryGridCard } from "./components/category-grid-card";
import { ArrowUpDown, Plus, Tag, Utensils } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryStatCard } from "./components/category-stat-card";

export default function Category() {
    const [, setOpen] = useState(false);

    const { totalCategories, totalTransactions, topCategoryLabel } = useMemo(() => {
        const top = MOCK_CATEGORIES.reduce((a, b) => (a.itemCount >= b.itemCount ? a : b));
        return {
            totalCategories: MOCK_CATEGORIES.length,
            totalTransactions: MOCK_TRANSACTIONS.length,
            topCategoryLabel: top.label,
        };
    }, []);

    return (
        <div>
            <Card className="border-0 bg-transparent p-0 shadow-none ring-0">
                <CardHeader className="flex flex-col gap-6 space-y-0 p-0 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-sans text-2xl font-bold tracking-tight text-gray-900">
                            Categorias
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Organize suas transações por categorias
                        </CardDescription>
                    </div>
                    <Button type="button" className="h-10 gap-2 px-4 font-medium" onClick={() => setOpen(true)}>
                        <Plus className="size-4" strokeWidth={2} aria-hidden />
                        Nova Categoria
                    </Button>
                </CardHeader>
            </Card>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                <CategoryStatCard
                    icon={Tag}
                    value={String(totalCategories)}
                    label="Total de categorias"
                    iconClassName="text-gray-900"
                />
                <CategoryStatCard
                    icon={ArrowUpDown}
                    value={String(totalTransactions)}
                    label="Total de transações"
                    iconClassName="text-purple-base"
                />
                <CategoryStatCard
                    icon={Utensils}
                    value={topCategoryLabel}
                    label="Categoria mais utilizada"
                    iconClassName="text-blue-base"
                />
            </div>
            <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MOCK_CATEGORIES.map((category) => (
                    <CategoryGridCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
}
