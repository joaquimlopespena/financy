import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { CategoryTone } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { Briefcase, Pencil, Trash2 } from "lucide-react";
import type { Category } from "@/types";
import { CATEGORY_ICON_OPTIONS } from "./category-icon-picker";

const toneIconBox: Record<CategoryTone, { box: string; icon: string }> = {
    blue: { box: "bg-blue-light", icon: "text-blue-base" },
    purple: { box: "bg-purple-light", icon: "text-purple-base" },
    orange: { box: "bg-orange-light", icon: "text-orange-base" },
    pink: { box: "bg-pink-light", icon: "text-pink-base" },
    yellow: { box: "bg-yellow-light", icon: "text-yellow-dark" },
    red: { box: "bg-red-light", icon: "text-red-base" },
    green: { box: "bg-green-light", icon: "text-green-base" },
    mint: { box: "bg-green-light", icon: "text-brand-base" },
};

const toneBadge: Record<CategoryTone, string> = {
    blue: "border-0 bg-blue-light text-blue-dark",
    purple: "border-0 bg-purple-light text-purple-dark",
    orange: "border-0 bg-orange-light text-orange-dark",
    pink: "border-0 bg-pink-light text-pink-dark",
    yellow: "border-0 bg-yellow-light text-yellow-dark",
    red: "border-0 bg-red-light text-red-dark",
    green: "border-0 bg-green-light text-green-dark",
    mint: "border-0 bg-green-light text-brand-dark",
};

interface CategoryGridCardProps {
    category: Category;
}

export function CategoryGridCard({ category }: CategoryGridCardProps) {
    const { name, description, icon, countTransactions } = category;
    const tone = category.color as keyof typeof toneIconBox;
    const styles = toneIconBox[tone];
    const CategoryIcon =
        CATEGORY_ICON_OPTIONS.find((o) => o.id === icon)?.Icon ?? Briefcase;

    return (
        <Card className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-none ring-0">
            <div className="flex items-start justify-between gap-3">
                <div
                    className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-lg",
                        styles.box,
                    )}
                >
                    <CategoryIcon
                        className={cn("size-5 stroke-2", styles.icon)}
                        strokeWidth={2}
                        aria-hidden
                    />
                </div>
                <div className="flex shrink-0 gap-1">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="size-8 rounded-md border-gray-200 bg-white shadow-none"
                        aria-label={`Excluir ${name}`}
                    >
                        <Trash2 className="size-4 text-red-base" strokeWidth={2} aria-hidden />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="size-8 rounded-md border-gray-200 bg-white shadow-none"
                        aria-label={`Editar ${name}`}
                    >
                        <Pencil className="size-4 text-gray-700" strokeWidth={2} aria-hidden />
                    </Button>
                </div>
            </div>

            <div className="mt-4 min-h-0 flex-1 space-y-1">
                <h3 className="text-base font-bold leading-tight text-gray-900">{name}</h3>
                <p className="text-sm leading-snug text-gray-500">{description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
                <Badge
                    variant="secondary"
                    className={cn(
                        "max-w-[min(100%,11rem)] truncate rounded-full px-2.5 py-1 text-xs font-medium",
                        toneBadge[tone],
                    )}
                >
                    {name}
                </Badge>
                <span className="shrink-0 text-sm text-gray-500">
                    {countTransactions} {countTransactions === 1 ? "item" : "itens"}
                </span>
            </div>
        </Card>
    );
}
