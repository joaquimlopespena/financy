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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryColorPicker } from "./category-color-picker";
import { CategoryIconPicker } from "./category-icon-picker";

interface CreateIdeiaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export function ModalFromCategory({ open, onOpenChange, onSuccess: _onSuccess }: CreateIdeiaDialogProps) {
    const [iconId, setIconId] = useState("briefcase");
    const [colorId, setColorId] = useState("green");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="gap-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg sm:max-w-lg"
            >
                <DialogHeader className="flex flex-row items-start justify-between gap-4 space-y-0 p-6 pb-4">
                    <div className="min-w-0 flex-1 space-y-1">
                        <DialogTitle className="font-sans text-lg font-semibold leading-tight text-gray-900">
                            Nova categoria
                        </DialogTitle>
                        <DialogDescription className="text-sm font-normal text-gray-500">
                            Organize suas transações por categorias
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
                    <div className="space-y-2">
                        <Label htmlFor="category-name" className="text-sm font-medium text-gray-800">
                            Titulo
                        </Label>
                        <Input id="category-name" placeholder="Ex. Alimentação" className="h-12 rounded-lg border-gray-200 bg-white px-3 text-sm placeholder:text-gray-400" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category-description" className="text-sm font-medium text-gray-800">
                            Descrição
                        </Label>
                        <Input id="category-description" placeholder="Descrição da categoria" className="h-12 rounded-lg border-gray-200 bg-white px-3 text-sm placeholder:text-gray-400" />
                        <small className="text-sm text-gray-500">Opcional</small>
                    </div>
                    <div className="space-y-2">
                        <span id="category-icon-label" className="text-sm font-medium text-gray-800">
                            Ícone
                        </span>
                        <CategoryIconPicker value={iconId} onValueChange={setIconId} aria-labelledby="category-icon-label" />
                        <input type="hidden" name="icon" value={iconId} readOnly />
                    </div>
                    <div className="space-y-2">
                        <span id="category-color-label" className="text-sm font-medium text-gray-800">
                            Cor
                        </span>
                        <CategoryColorPicker
                            value={colorId}
                            onValueChange={setColorId}
                            aria-labelledby="category-color-label"
                        />
                        <input type="hidden" name="color" value={colorId} readOnly />
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
