import { cn } from "@/lib/utils";

export const CATEGORY_COLOR_OPTIONS: {
    id: string;
    inner: string;
    borderSelected: string;
}[] = [
    { id: "green", inner: "bg-green-base", borderSelected: "border-green-dark" },
    { id: "blue", inner: "bg-blue-base", borderSelected: "border-blue-dark" },
    { id: "purple", inner: "bg-purple-base", borderSelected: "border-purple-dark" },
    { id: "pink", inner: "bg-pink-base", borderSelected: "border-pink-dark" },
    { id: "red", inner: "bg-red-base", borderSelected: "border-red-dark" },
    { id: "orange", inner: "bg-orange-base", borderSelected: "border-orange-dark" },
    { id: "yellow", inner: "bg-yellow-base", borderSelected: "border-yellow-dark" },
];

interface CategoryColorPickerProps {
    value: string;
    onValueChange: (colorId: string) => void;
    className?: string;
    "aria-labelledby"?: string;
}

export function CategoryColorPicker({
    value,
    onValueChange,
    className,
    "aria-labelledby": ariaLabelledBy,
}: CategoryColorPickerProps) {
    return (
        <div
            role="radiogroup"
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabelledBy ? undefined : "Cor da categoria"}
            className={cn("grid grid-cols-7 gap-2", className)}
        >
            {CATEGORY_COLOR_OPTIONS.map(({ id, inner, borderSelected }) => {
                const selected = value === id;
                return (
                    <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onValueChange(id)}
                        className={cn(
                            "flex min-h-10 min-w-0 flex-1 items-stretch rounded-lg border-2 bg-white p-1.5 transition-colors",
                            "hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base/30",
                            selected ? borderSelected : "border-gray-200",
                        )}
                    >
                        <span className={cn("block min-h-5 w-full rounded-md", inner)} aria-hidden />
                        <span className="sr-only">Cor {id}</span>
                    </button>
                );
            })}
        </div>
    );
}
