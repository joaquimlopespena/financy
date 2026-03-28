import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CategoryStatCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
    iconClassName?: string;
}

export function CategoryStatCard({ icon: Icon, value, label, iconClassName }: CategoryStatCardProps) {
    return (
        <Card className="h-auto w-full rounded-xl border border-gray-200 bg-white p-6 shadow-none ring-0">
            <div className="flex items-center gap-4">
                <Icon className={cn("size-6 shrink-0 stroke-2", iconClassName ?? "text-gray-900")} aria-hidden />
                <div className="flex min-w-0 flex-col gap-1">
                    <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</p>
                </div>
            </div>
        </Card>
    );
}
