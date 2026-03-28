import { CircleArrowDown, CircleArrowUp, Wallet } from "lucide-react";
import { SummaryStatCard } from "@/pages/dashboard/components/summary-stat-card";
import { formatBrl } from "@/lib/format";

interface SummaryCardsRowProps {
    total_balance: number;
    total_income: number;
    total_expenses: number;
}

export function SummaryCardsRow({ total_balance, total_income, total_expenses }: SummaryCardsRowProps) {
    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <SummaryStatCard
                label="Saldo total"
                value={formatBrl(total_balance)}
                icon={<Wallet className="size-5 shrink-0 text-purple-base" strokeWidth={2} aria-hidden />}
            />
            <SummaryStatCard
                label="Receitas do mês"
                value={formatBrl(total_income)}
                icon={
                    <CircleArrowUp className="size-5 shrink-0 text-brand-base" strokeWidth={2} aria-hidden />
                }
            />
            <SummaryStatCard
                label="Despesas do mês"
                value={formatBrl(total_expenses)}
                icon={
                    <CircleArrowDown className="size-5 shrink-0 text-red-base" strokeWidth={2} aria-hidden />
                }
            />
        </div>
    );
}
