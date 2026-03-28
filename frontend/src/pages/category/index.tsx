import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryGridCard } from "./components/category-grid-card";
import { CategoryGridCardSkeleton } from "./components/category-grid-card-skeleton";
import { ArrowUpDown, Loader2, Plus, Tag, Utensils } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryStatCard } from "./components/category-stat-card";
import { ModalFromCategory } from "./components/modal-from-category";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import type { Category } from "@/types";

export default function Category() {
    const [open, setOpen] = useState(false);
    const { data, loading: categoriesLoading } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
    const [onType, setOnType] = useState<"create" | "update">("create");

    const { totalCategories, totalTransactions, topCategoryLabel } = useMemo(() => {
        const categories = data?.categories ?? [];
        const top =
            categories.length > 0
                ? categories.reduce((a, b) =>
                      a.countTransactions >= b.countTransactions ? a : b,
                  )
                : undefined;
        return {
            totalCategories: categories.length,
            totalTransactions: categories.reduce((sum, cat) => sum + cat.countTransactions, 0),
            topCategoryLabel: top?.name,
        };
    }, [data]);

    /** Volta o fluxo para “nova categoria” (usado ao fechar ou após sucesso). */
    const resetModalState = () => {
        setCategoryToEdit(null);
        setOnType("create");
    };

    const handleModalOpenChange = (next: boolean) => {
        if (!next) resetModalState();
        setOpen(next);
    };

    const handleSuccess = () => {
        resetModalState();
    };

    const handleEdit = (category: Category) => {
        setOpen(true);
        setCategoryToEdit(category);
        setOnType("update");
    };

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
                    <Button
                        type="button"
                        className="h-10 gap-2 px-4 font-medium"
                        onClick={() => {
                            resetModalState();
                            setOpen(true);
                        }}
                    >
                        <Plus className="size-4" strokeWidth={2} aria-hidden />
                        Nova Categoria
                    </Button>
                </CardHeader>
            </Card>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                <CategoryStatCard
                    icon={Tag}
                    value={categoriesLoading ? "—" : String(totalCategories)}
                    label="Total de categorias"
                    iconClassName="text-gray-900"
                />
                <CategoryStatCard
                    icon={ArrowUpDown}
                    value={categoriesLoading ? "—" : String(totalTransactions)}
                    label="Total de transações"
                    iconClassName="text-purple-base"
                />
                <CategoryStatCard
                    icon={Utensils}
                    value={
                        categoriesLoading
                            ? "—"
                            : (topCategoryLabel ?? "Nenhuma categoria encontrada")
                    }
                    label="Categoria mais utilizada"
                    iconClassName="text-blue-base"
                />
            </div>
            <div className="mt-6 space-y-4">
                {categoriesLoading ? (
                    <p className="flex items-center gap-2 text-sm text-gray-600" role="status" aria-live="polite">
                        <Loader2 className="size-4 shrink-0 animate-spin text-brand-base" aria-hidden />
                        Carregando categorias…
                    </p>
                ) : null}
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categoriesLoading
                        ? Array.from({ length: 8 }, (_, i) => <CategoryGridCardSkeleton key={i} />)
                        : (data?.categories ?? []).map((category) => (
                              <CategoryGridCard
                                  key={category.id}
                                  category={category}
                                  onEdit={handleEdit}
                              />
                          ))}
                </div>
            </div>
            <ModalFromCategory
                open={open}
                onOpenChange={handleModalOpenChange}
                onSuccess={handleSuccess}
                onType={onType}
                category={categoryToEdit ?? undefined}
            />
        </div>
    );
}
