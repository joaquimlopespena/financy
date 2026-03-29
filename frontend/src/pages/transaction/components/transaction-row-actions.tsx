import { Button } from "@/components/ui/button";
import type { Transaction } from "@/types";
import { useTransactionDelete } from "@/stores/transaction";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { TransactionDeleteDialog } from "./transaction-delete-dialog";

interface TransactionRowActionsProps {
    transaction: Transaction;
    /** Após exclusão bem-sucedida (ex.: refetch da lista paginada). */
    onDeleted?: () => void;
    onEdit?: (transaction: Transaction) => void;
}

export function TransactionRowActions({ transaction, onDeleted, onEdit }: TransactionRowActionsProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const { submitDelete, loading } = useTransactionDelete();

    const handleDelete = async () => {
        const ok = await submitDelete(transaction.id);
        if (ok) {
            setDeleteOpen(false);
            onDeleted?.();
        }
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="shrink-0 border-gray-200 text-red-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                aria-label={`Excluir transação ${transaction.title}`}
                onClick={() => setDeleteOpen(true)}
            >
                <Trash2 className="size-4" strokeWidth={2} />
            </Button>
            <TransactionDeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                transactionTitle={transaction.title}
                loading={loading}
                onConfirm={handleDelete}
            />
            <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="shrink-0 border-gray-200 text-gray-700 hover:bg-gray-50"
                aria-label={`Editar transação ${transaction.title}`}
                onClick={() => onEdit?.(transaction)}
            >
                <Pencil className="size-4" strokeWidth={2} />
            </Button>
        </div>
    );
}
