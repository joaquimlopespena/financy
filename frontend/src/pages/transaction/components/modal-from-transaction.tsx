import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { TransactionTypeSegment, type TransactionKind } from "./transaction-type-segment";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectForm } from "./Select";
import { MOCK_CATEGORIES } from "@/lib/mock";

interface CreateIdeiaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function ModalFromTransaction({ open, onOpenChange, onSuccess: _onSuccess }: CreateIdeiaDialogProps) {
    const [kind, setKind] = useState<TransactionKind>("expense");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="gap-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:max-w-lg"
            >
                <DialogHeader className="flex flex-row items-start justify-between gap-4 space-y-0 p-6 pb-4">
                    <div className="min-w-0 flex-1 space-y-1">
                        <DialogTitle className="font-sans text-lg font-semibold leading-tight text-gray-900">
                            Nova transação
                        </DialogTitle>
                        <DialogDescription className="text-sm font-normal text-gray-500">
                            Registre sua despesa ou receita
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
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <TransactionTypeSegment value={kind} onValueChange={setKind} />

                    <div className="space-y-2">
                        <Label htmlFor="tx-desc" className="text-sm font-medium text-gray-800">
                            Descrição
                        </Label>
                        <Input
                            id="tx-desc"
                            placeholder="Ex. Almoço no restaurante"
                            className="h-12 rounded-lg border-gray-200 bg-white px-3 text-sm placeholder:text-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="min-w-0 space-y-2">
                            <Label htmlFor="transaction-date" className="text-sm font-medium text-gray-800">
                                Data
                            </Label>
                            <Input
                                id="transaction-date"
                                type="text"
                                name="date"
                                placeholder="Selecione"
                                autoComplete="off"
                                className="h-12 rounded-lg border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                        <div className="min-w-0 space-y-2">
                            <Label htmlFor="transaction-value" className="text-sm font-medium text-gray-800">
                                Valor
                            </Label>
                            <Input
                                id="transaction-value"
                                type="text"
                                name="amount"
                                inputMode="decimal"
                                defaultValue="R$ 0,00"
                                className="h-12 rounded-lg border-gray-200 bg-white px-3 text-sm tabular-nums text-gray-900"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium text-gray-800">
                            Categoria
                        </Label>
                        <SelectForm
                            id="category"
                            label="Categoria"
                            allLabel="Selecione"
                            options={MOCK_CATEGORIES.map((category) => ({
                                value: category.id,
                                label: category.label,
                            }))}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="h-11 w-full rounded-lg bg-brand-base text-base font-semibold text-white hover:bg-brand-dark"
                    >
                        Salvar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
