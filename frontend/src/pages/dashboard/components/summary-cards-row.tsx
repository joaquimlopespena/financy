import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { SummaryStatCard } from "@/pages/dashboard/components/summary-stat-card";

export function SummaryCardsRow() {
    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <SummaryStatCard
                label="Saldo total"
                value="R$ 12.847,32"
                icon={<Wallet className="size-5 shrink-0 text-purple-base" strokeWidth={2} aria-hidden />}
            />
            <SummaryStatCard
                label="Receitas do mês"
                value="R$ 4.250,00"
                icon={
                    <CircleArrowUp className="size-5 shrink-0 text-brand-base" strokeWidth={2} aria-hidden />
                }
            />
            <SummaryStatCard
                label="Despesas do mês"
                value="R$ 2.180,45"
                icon={
                    <CircleArrowDown className="size-5 shrink-0 text-red-base" strokeWidth={2} aria-hidden />
                }
            />
        </div>
    );
}
