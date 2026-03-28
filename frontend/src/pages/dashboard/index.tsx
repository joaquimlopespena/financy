import { CategoriesCard } from "@/pages/dashboard/components/categories-card";
import { RecentTransactionsCard } from "@/pages/dashboard/components/recent-transactions-card";
import { SummaryCardsRow } from "@/pages/dashboard/components/summary-cards-row";
import { useQuery } from "@apollo/client/react";
import { GET_DASHBOARD } from "@/lib/graphql/queries/dashboard";
import type { Dashboard } from "@/types";

type DashboardQueryData = { dashboard: Dashboard };

export default function Dashboard() {
    const { data, loading, error } = useQuery<DashboardQueryData>(GET_DASHBOARD);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data?.dashboard) return <div>No dashboard data</div>;
    const { total_balance, total_income, total_expenses, categories, transactions } = data.dashboard;
    return (
        <div>
            <SummaryCardsRow total_balance={total_balance} total_income={total_income} total_expenses={total_expenses} />

            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:items-start">
                <RecentTransactionsCard transactions={transactions} />
                <CategoriesCard categories={categories} />
            </div>
        </div>
    );
}
