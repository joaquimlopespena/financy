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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CategoryColorPicker } from "./category-color-picker";
import { CategoryIconPicker } from "./category-icon-picker";
import { useCategoryCreate, useCategoryUpdate } from "@/stores/category";
import type { Category } from "@/types";

interface CreateIdeiaDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    onType?: "create" | "update";
    /** Em modo `update`, passar a categoria a editar. */
    category?: Category;
}

export function ModalFromCategory({
    open,
    onOpenChange,
    onSuccess,
    onType = "create",
    category,
}: CreateIdeiaDialogProps) {
    const [iconId, setIconId] = useState("briefcase");
    const [colorId, setColorId] = useState("green");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function resetForm() {
        setIconId("briefcase");
        setColorId("green");
        setTitle("");
        setDescription("");
    }

    const handleOpenChange = (next: boolean) => {
        if (!next) resetForm();
        onOpenChange(next);
    };

    const { submitCreate, loading } = useCategoryCreate({
        onOpenChange: handleOpenChange,
        onSuccess,
    });

    const { submitUpdate, loading: updateLoading } = useCategoryUpdate({
        onOpenChange: handleOpenChange,
        onSuccess,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        void submitCreate({
            name: title.trim(),
            description: description.trim() || undefined,
            icon: iconId,
            color: colorId,
        });
    };

    const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!category?.id) return;
        void submitUpdate(category.id, {
            name: title.trim(),
            description: description.trim() || undefined,
            icon: iconId,
            color: colorId,
        });
    };

    useEffect(() => {
        if (category) {
            setTitle(category.name);
            setDescription(category.description);
            setIconId(category.icon);
            setColorId(category.color);
        }
    }, [category, onType]);

    const handleClose = () => handleOpenChange(false);

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 shadow-lg sm:max-w-lg"
            >
                <DialogHeader className="flex flex-row items-start justify-between gap-4 space-y-0 p-6 pb-4">
                    <div className="min-w-0 flex-1 space-y-1">
                        <DialogTitle className="font-sans text-lg font-semibold leading-tight text-gray-900">
                            {onType === "create" ? "Nova categoria" : "Editar categoria"}
                        </DialogTitle>
                        <DialogDescription className="text-sm font-normal text-gray-500">
                            {onType === "create" ? "Crie uma nova categoria" : "Edite a categoria"}
                        </DialogDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        className="shrink-0 rounded-lg border-gray-200 bg-white text-gray-600 shadow-none hover:bg-gray-50"
                        onClick={handleClose}
                    >
                        <XIcon className="size-4" strokeWidth={2} aria-hidden />
                        <span className="sr-only">Fechar</span>
                    </Button>
                </DialogHeader>

                <form className="flex flex-col gap-6 px-6 pb-6" onSubmit={onType === "create" ? handleSubmit : handleSubmitUpdate}>
                    <div className="space-y-2">
                        <Label htmlFor="category-name" className="text-sm font-medium text-gray-800">
                            Título
                        </Label>
                        <Input
                            id="category-name"
                            name="name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex. Alimentação"
                            className="h-12 rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-none placeholder:text-gray-400"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category-description" className="text-sm font-medium text-gray-800">
                            Descrição
                        </Label>
                        <Input
                            id="category-description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição da categoria"
                            className="h-12 rounded-lg border border-gray-200 bg-white px-3 text-sm shadow-none placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-500">Opcional</p>
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
                        disabled={
                            !title.trim() ||
                            (onType === "create" && loading) ||
                            (onType === "update" && (updateLoading || !category?.id))
                        }
                        className="h-11 w-full rounded-xl bg-brand-base text-base font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
                    >
                        {onType === "create"
                            ? loading
                                ? "Salvando…"
                                : "Salvar"
                            : updateLoading
                              ? "Salvando…"
                              : "Salvar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
