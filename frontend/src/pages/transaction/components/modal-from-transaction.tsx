import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { TransactionTypeSegment, type TransactionKind } from "./transaction-type-segment";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectForm } from "./Select";
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import type { Category, Transaction } from "@/types";
import { useTransactionCreate, useTransactionUpdate } from "@/stores/transaction";
import { formatCentsToBrlInput, parseCurrencyDigitsToCents } from "@/lib/format";
import { DatePickerSimple } from "@/components/ui/date-picker-simple";
import { toast } from "sonner";

interface CreateIdeiaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    onType?: "create" | "update";
    /** Em modo `update`, passar a transação a editar. */
    transaction?: Transaction;
}

const SELECT_PLACEHOLDER = "all";

export function ModalFromTransaction({
    open,
    onOpenChange,
    onSuccess: _onSuccess,
    onType = "create",
    transaction,
}: CreateIdeiaDialogProps) {
    const [kind, setKind] = useState<TransactionKind>("expense");
    const [description, setDescription] = useState("");
    const [amountCents, setAmountCents] = useState(0);
    const [transactionDate, setTransactionDate] = useState<Date | undefined>();
    const [categoryId, setCategoryId] = useState("");

    const { submitCreate, loading } = useTransactionCreate({
        onOpenChange: onOpenChange,
        onSuccess: _onSuccess,
    });

    const { submitUpdate, loading: updateLoading } = useTransactionUpdate({
        onOpenChange: onOpenChange,
        onSuccess: _onSuccess,
    });

    const { data: categoriesData, loading: categoriesLoading } = useQuery<{ categories: Category[] }>(
        GET_CATEGORIES,
        { skip: !open },
    );

    const categoryOptions = useMemo(
        () =>
            (categoriesData?.categories ?? []).map((c) => ({
                value: c.id,
                label: c.name,
            })),
        [categoriesData?.categories],
    );

    useEffect(() => {
        if (!open) return;
        if (!transaction) {
            setKind("expense");
            setDescription("");
            setAmountCents(0);
            setTransactionDate(undefined);
            setCategoryId("");
            return;
        }
        const income = transaction.type?.toUpperCase() === "INCOME";
        setKind(income ? "income" : "expense");
        setDescription(transaction.title ?? transaction.description ?? "");
        setAmountCents(Math.round(Number(transaction.amount) * 100));
        setTransactionDate(transaction.transactionDate ? new Date(transaction.transactionDate) : undefined);
        setCategoryId(transaction.category.id ?? "");
    }, [open, transaction]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(description, amountCents, transactionDate?.toISOString(), categoryId);
        if (!description.trim() || amountCents <= 0 || !transactionDate || !categoryId) {
            switch (true) {
                case !description.trim():
                    toast.error("Por favor, preencha a descrição");
                    break;
                case amountCents <= 0:
                    toast.error("Por favor, preencha o valor");
                    break;
                case !transactionDate:
                    toast.error("Por favor, selecione a data");
                    break;
                case !categoryId:
                    toast.error("Por favor, selecione a categoria");
                    break;
            }
            return;
        }
        void submitCreate({
            title: description.trim(),
            description: description.trim(),
            amount: amountCents / 100,
            type: kind === "income" ? "INCOME" : "EXPENSE",
            transactionDate: transactionDate.toISOString(),
            categoryId: categoryId,
        });
    }

    const handleSubmitUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(description, amountCents, transactionDate?.toISOString(), categoryId);
        if (!description.trim() || amountCents <= 0 || !transactionDate || !categoryId) {
            switch (true) {
                case !description.trim():
                    toast.error("Por favor, preencha a descrição");
                    break;
                case amountCents <= 0:
                    toast.error("Por favor, preencha o valor");
                    break;
                case !transactionDate:
                    toast.error("Por favor, selecione a data");
                    break;
                case !categoryId:
                    toast.error("Por favor, selecione a categoria");
                    break;
            }
            return;
        }
        
        void submitUpdate(transaction?.id ?? "", {
            title: description.trim(),
            description: description.trim(),
            amount: amountCents / 100,
            type: kind === "income" ? "INCOME" : "EXPENSE",
            transactionDate: transactionDate.toISOString(),
            categoryId,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="gap-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:max-w-lg"
            >
                <DialogHeader className="flex flex-row items-start justify-between gap-4 space-y-0 p-6 pb-4">
                    <div className="min-w-0 flex-1 space-y-1">
                        <DialogTitle className="font-sans text-lg font-semibold leading-tight text-gray-900">
                            {onType === "create" ? "Nova transação" : "Editar transação"}
                        </DialogTitle>
                        <DialogDescription className="text-sm font-normal text-gray-500">
                            {onType === "create" ? "Registre sua despesa ou receita" : "Edite sua transação"}
                        </DialogDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="shrink-0 rounded-lg border-gray-200 bg-white text-gray-600 shadow-none hover:bg-gray-50"
                        onClick={() => onOpenChange(false)}
                    >
                        <XIcon className="size-4" strokeWidth={2} aria-hidden />
                        <span className="sr-only">Fechar</span>
                    </Button>
                </DialogHeader>

                <form
                    className="flex flex-col gap-5 px-6 pb-6"
                    onSubmit={onType === "create" ? handleSubmit : handleSubmitUpdate}
                >
                    <TransactionTypeSegment value={kind} onValueChange={setKind} />

                    <div className="space-y-2">
                        <Label htmlFor="tx-desc" className="text-sm font-medium text-gray-800">
                            Descrição
                        </Label>
                        <Input
                            id="tx-desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ex. Almoço no restaurante"
                            className="h-12 rounded-lg border-gray-200 bg-white px-3 text-sm placeholder:text-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="min-w-0 space-y-2">
                            <Label htmlFor="transaction-date" className="text-sm font-medium text-gray-800">
                                Data
                            </Label>
                            <DatePickerSimple
                                id="transaction-date"
                                value={transactionDate}
                                onChange={setTransactionDate}
                                placeholder="Selecione"
                            />
                        </div>
                        <div className="min-w-0 space-y-2">
                            <Label htmlFor="transaction-value" className="text-sm font-medium text-gray-800">
                                Valor
                            </Label>
                            <div className="relative">
                                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
                                    R$
                                </span>
                                <Input
                                    id="transaction-value"
                                    type="text"
                                    name="amount"
                                    inputMode="numeric"
                                    autoComplete="off"
                                    placeholder="0,00"
                                    value={formatCentsToBrlInput(amountCents)}
                                    onChange={(e) => setAmountCents(parseCurrencyDigitsToCents(e.target.value))}
                                    className="h-12 min-w-0 w-full rounded-lg border-gray-200 bg-white pl-11 pr-3 text-sm tabular-nums text-gray-900"
                                    
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium text-gray-800">
                            Categoria
                        </Label>
                        <SelectForm
                            id="category"
                            label="Categoria"
                            allLabel={categoriesLoading ? "Carregando categorias…" : "Selecione"}
                            disabled={categoriesLoading}
                            value={categoryId === "" ? SELECT_PLACEHOLDER : categoryId}
                            onValueChange={(v) => setCategoryId(v === SELECT_PLACEHOLDER ? "" : v)}
                            options={categoryOptions}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={onType === "create" ? loading : updateLoading}
                        className="h-11 w-full rounded-lg bg-brand-base text-base font-semibold text-white hover:bg-brand-dark"
                    >
                        {(onType === "create" ? loading : updateLoading) ? "Salvando…" : "Salvar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
