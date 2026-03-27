import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface CreateIdeiaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void,
}

export function ModalFromTransaction({ open, onOpenChange, onSuccess: _onSuccess }: CreateIdeiaDialogProps) {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Nova transação</DialogTitle>
                    <DialogDescription>
                        Preencha os dados para registrar uma nova movimentação.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}   