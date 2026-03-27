import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectFormProps {
    options: { label: string; value: string }[];
    /** Rótulo acessível (leitor de tela) */
    label: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    /** Texto da opção “tudo” (Tipo: Todos, Categoria: Todas). Só aplica se `showAllOption` for true. */
    allLabel?: string;
    /** Se false, só lista `options` (ex.: Período sem “Todos”) */
    showAllOption?: boolean;
    id?: string;
}

const ALL_VALUE = "all";

export function SelectForm({
    options,
    label,
    onValueChange,
    defaultValue = ALL_VALUE,
    allLabel = "Todos",
    showAllOption = true,
    id,
}: SelectFormProps) {
    const items = showAllOption
        ? [{ label: allLabel, value: ALL_VALUE }, ...options]
        : options;

    return (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
            <SelectTrigger
                id={id}
                aria-label={label}
                className="h-10 w-full border border-gray-200 bg-white px-3 text-sm font-normal text-gray-900 shadow-none ring-0 hover:bg-white focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-brand-base/25 data-[size=default]:h-10 data-placeholder:text-gray-900 [&_svg]:size-4 [&_svg]:text-gray-600"
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 bg-white">
                <SelectGroup>
                    {items.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
