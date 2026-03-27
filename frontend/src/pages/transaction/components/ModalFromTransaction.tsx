import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface CreateIdeiaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void,
}

export function ModalFromTransaction({ open, onOpenChange, onSuccess }: CreateIdeiaDialogProps) {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Nova transação</DialogTitle>
                </DialogHeader>  
            </DialogContent>
        </Dialog>
    );
}   