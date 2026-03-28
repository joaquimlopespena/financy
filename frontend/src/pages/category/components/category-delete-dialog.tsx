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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export interface CategoryDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categoryName: string;
    countTransactions: number;
    /** Chamada após confirmar (ex.: mutation delete). O diálogo fecha pelo Radix. */
    onConfirm?: () => void;
}

export function CategoryDeleteDialog({
    open,
    onOpenChange,
    categoryName,
    countTransactions,
    onConfirm,
}: CategoryDeleteDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md sm:max-w-md" size="default">
                <AlertDialogHeader className="text-left sm:text-left">
                    <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tem certeza que deseja remover{" "}
                        <span className="font-medium text-foreground">{categoryName}</span>? Esta ação não pode
                        ser desfeita.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Alert variant="destructive" className="mt-2">
                    <AlertCircle className="size-4" aria-hidden />
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription>
                        {countTransactions > 0
                            ? `Esta categoria está ligada a ${countTransactions} ${countTransactions === 1 ? "transação" : "transações"}.`
                            : "Nenhuma transação está usando esta categoria no momento."}
                    </AlertDescription>
                </Alert>
                <AlertDialogFooter className="mt-4 sm:justify-end">
                    <AlertDialogCancel type="button">Cancelar</AlertDialogCancel>
                    <AlertDialogAction type="button" variant="destructive" onClick={() => onConfirm?.()}>
                        Excluir
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
