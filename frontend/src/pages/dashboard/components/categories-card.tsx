import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBrl } from "@/lib/format";
import type { CategorySummary, CategoryTone } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const categoryBadgeClass: Record<CategoryTone, string> = {
    blue: "border-0 bg-blue-light text-blue-dark hover:bg-blue-light",
    purple: "border-0 bg-purple-light text-purple-dark hover:bg-purple-light",
    orange: "border-0 bg-orange-light text-orange-dark hover:bg-orange-light",
    pink: "border-0 bg-pink-light text-pink-dark hover:bg-pink-light",
    yellow: "border-0 bg-yellow-light text-yellow-dark hover:bg-yellow-light",
};

interface CategoriesCardProps {
    categories: CategorySummary[];
}

export function CategoriesCard({ categories }: CategoriesCardProps) {
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
                    Gerenciar
                    <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                </Button>
            </CardHeader>
            <CardContent className="divide-y divide-gray-200 p-0">
                {categories.map((cat) => (
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
                            {formatBrl(cat.total)}
                        </span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
