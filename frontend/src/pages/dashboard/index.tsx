import { CategoriesCard } from "@/pages/dashboard/components/categories-card";
import { RecentTransactionsCard } from "@/pages/dashboard/components/recent-transactions-card";
import { SummaryCardsRow } from "@/pages/dashboard/components/summary-cards-row";
import { MOCK_CATEGORIES, MOCK_TRANSACTIONS } from "@/lib/mock";

export default function Dashboard() {
    return (
        <div>
            <SummaryCardsRow />

            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:items-start">
                <RecentTransactionsCard transactions={MOCK_TRANSACTIONS} />
                <CategoriesCard categories={MOCK_CATEGORIES} />
            </div>
        </div>
    );
}
