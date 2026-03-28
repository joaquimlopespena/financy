import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { SelectForm } from "./components/Select";
import { MonthYearPicker } from "./components/month-year-picker";
import { MOCK_CATEGORIES } from "@/lib/mock";
import { TransactionsTable } from "./components/transactions-table";
import { ModalFromTransaction } from "./components/modal-from-transaction";
import { useEffect, useState } from "react";
import type { Transaction } from "@/types";
import { format, startOfMonth } from "date-fns";
import { useQuery } from "@apollo/client/react";
import { GET_PAGINATED_TRANSACTIONS } from "@/lib/graphql/queries/transaction";

const PAGE_SIZE = 10;

type PaginatedData = {
    paginte: {
        page: number;
        total: number;
        limit: number;
        transactions: Transaction[];
    };
};

/** Conteúdo centralizado pelo `Layout`; div raiz sem classe extra. */
export default function Transaction() {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [periodMonth, setPeriodMonth] = useState(() => startOfMonth(new Date()));
    const periodKey = format(periodMonth, "yyyy-MM");

    const { data, refetch } = useQuery<PaginatedData>(GET_PAGINATED_TRANSACTIONS, {
        variables: { filter: { page, limit: PAGE_SIZE, date: periodKey } },
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        setPage(1);
    }, [periodKey]);

    const pag = data?.paginte;
    const transactions = pag?.transactions ?? [];
    const total = pag?.total ?? 0;

    /**
     * Só ajusta página após resposta alinhada ao `page` pedido.
     * Sem isso, `total === 0` no primeiro render (antes do fetch) ou dados
     * antigos (ainda da página 1) resetavam para 1 ao clicar em outra página.
     */
    useEffect(() => {
        if (!pag) return;
        if (pag.page !== page) return;

        if (pag.total === 0) {
            if (page !== 1) setPage(1);
            return;
        }
        const maxPage = Math.max(1, Math.ceil(pag.total / PAGE_SIZE));
        if (page > maxPage) setPage(maxPage);
    }, [pag, page]);

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }
    const handleSuccess = () => {
        setOpen(false);
        setPage(1);
        void refetch({ filter: { page: 1, limit: PAGE_SIZE, date: periodKey } });
    };


    return (
        <div>
            <Card className="border-0 bg-transparent p-0 shadow-none ring-0">
                <CardHeader className="flex flex-col gap-6 space-y-0 p-0 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="font-sans text-2xl font-bold tracking-tight text-gray-900">
                            Transações
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500">
                            Gerencie todas as suas transações financeiras
                        </CardDescription>
                    </div>
                    <Button type="button" className="h-10 gap-2 px-4 font-medium" onClick={() => setOpen(true)}>
                        <Plus className="size-4" strokeWidth={2} aria-hidden />
                        Nova transação
                    </Button>
                </CardHeader>
            </Card>

            <Card className="mt-6 w-full border border-gray-200 bg-white shadow-sm ring-0">
                <CardContent className="p-6">
                    <form>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="search" className="text-sm font-medium text-gray-800">
                                    Buscar
                                </Label>
                                <div className="relative">
                                    <Search
                                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                                        aria-hidden
                                    />
                                    <Input
                                        id="search"
                                        type="search"
                                        placeholder="Buscar por descrição"
                                        autoComplete="off"
                                        className="h-10 rounded-lg border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="filter-type" className="text-sm font-medium text-gray-800">
                                    Tipo
                                </Label>
                                <SelectForm
                                    id="filter-type"
                                    label="Filtrar por tipo de transação"
                                    options={[
                                        { value: "income", label: "Receitas" },
                                        { value: "expense", label: "Despesas" },
                                    ]}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="filter-category" className="text-sm font-medium text-gray-800">
                                    Categoria
                                </Label>
                                <SelectForm
                                    id="filter-category"
                                    label="Filtrar por categoria"
                                    allLabel="Todas"
                                    options={MOCK_CATEGORIES.map((category) => ({
                                        value: category.id,
                                        label: category.label,
                                    }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="filter-period" className="text-sm font-medium text-gray-800">
                                    Período
                                </Label>
                                <MonthYearPicker
                                    id="filter-period"
                                    value={periodMonth}
                                    onChange={setPeriodMonth}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Card className="mt-6 w-full overflow-hidden border border-gray-200 bg-white shadow-sm ring-0">
                <CardContent className="p-0">
                    <TransactionsTable
                        transactions={transactions}
                        total={total}
                        page={pag?.page ?? page}
                        pageSize={PAGE_SIZE}
                        onPageChange={setPage}
                    />
                </CardContent>
            </Card>
            <ModalFromTransaction open={open} onOpenChange={handleOpenChange} onSuccess={handleSuccess} />
        </div>
    );
}
