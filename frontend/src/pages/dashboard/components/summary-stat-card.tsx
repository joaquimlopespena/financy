import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { ReactNode } from "react";

interface SummaryStatCardProps {
    label: string;
    value: string;
    icon: ReactNode;
}

export function SummaryStatCard({ label, value, icon }: SummaryStatCardProps) {
    return (
        <Card className="h-auto min-h-0 w-full border border-gray-200 bg-white p-6 shadow-sm ring-0">
            <CardHeader className="gap-4 p-0">
                <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {icon}
                    {label}
                </CardTitle>
                <CardDescription className="text-2xl font-bold tracking-tight text-gray-900">
                    {value}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
