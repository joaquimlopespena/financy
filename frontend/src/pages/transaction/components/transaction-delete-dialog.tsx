import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export interface TransactionDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transactionTitle: string;
    loading?: boolean;
    /** Chamada ao confirmar; o pai fecha o diálogo em caso de sucesso. */
    onConfirm?: () => void | Promise<void>;
}

export function TransactionDeleteDialog({
    open,
    onOpenChange,
    transactionTitle,
    loading = false,
    onConfirm,
}: TransactionDeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md sm:max-w-md" size="default">
                <AlertDialogHeader className="text-left sm:text-left">
                    <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja remover{" "}
                        <span className="font-medium text-foreground">{transactionTitle}</span>? Esta ação não pode
                        ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 sm:justify-end">
                    <AlertDialogCancel type="button" disabled={loading}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        type="button"
                        variant="destructive"
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            void onConfirm?.();
                        }}
                    >
                        {loading ? "Excluindo…" : "Excluir"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
