import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface CreateIdeiaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function ModalFromTransaction({ open, onOpenChange, onSuccess: _onSuccess }: CreateIdeiaDialogProps) {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false} className="gap-0 p-0 sm:max-w-md">
                <DialogHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b border-gray-100 p-6 pb-4">
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
            </DialogContent>
        </Dialog>
    );
}
