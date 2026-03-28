import { cn } from "@/lib/utils";
import {
    Activity,
    BookOpen,
    Briefcase,
    Car,
    Dumbbell,
    Gift,
    Home,
    Luggage,
    PawPrint,
    PiggyBank,
    Receipt,
    ShoppingBag,
    ShoppingCart,
    Ticket,
    Utensils,
    Wallet,
    type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICON_OPTIONS: { id: string; Icon: LucideIcon }[] = [
    { id: "briefcase", Icon: Briefcase },
    { id: "car", Icon: Car },
    { id: "activity", Icon: Activity },
    { id: "piggy-bank", Icon: PiggyBank },
    { id: "shopping-cart", Icon: ShoppingCart },
    { id: "ticket", Icon: Ticket },
    { id: "shopping-bag", Icon: ShoppingBag },
    { id: "utensils", Icon: Utensils },
    { id: "paw-print", Icon: PawPrint },
    { id: "home", Icon: Home },
    { id: "gift", Icon: Gift },
    { id: "dumbbell", Icon: Dumbbell },
    { id: "book-open", Icon: BookOpen },
    { id: "luggage", Icon: Luggage },
    { id: "wallet", Icon: Wallet },
    { id: "receipt", Icon: Receipt },
];

interface CategoryIconPickerProps {
    value: string;
    onValueChange: (iconId: string) => void;
    className?: string;
    "aria-labelledby"?: string;
}

export function CategoryIconPicker({ value, onValueChange, className, "aria-labelledby": ariaLabelledBy }: CategoryIconPickerProps) {
    return (
        <div
            role="radiogroup"
            aria-labelledby={ariaLabelledBy}
            aria-label={ariaLabelledBy ? undefined : "Ícone da categoria"}
            className={cn("grid grid-cols-4 gap-2 sm:grid-cols-8", className)}
        >
            {CATEGORY_ICON_OPTIONS.map(({ id, Icon }) => {
                const selected = value === id;
                return (
                    <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => onValueChange(id)}
                        className={cn(
                            "flex h-10 w-full items-center justify-center rounded-lg border-2 bg-white transition-colors sm:h-11",
                            "hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base/30",
                            selected ? "border-brand-base" : "border-gray-200",
                        )}
                    >
                        <Icon className="size-5 stroke-2 text-gray-500" aria-hidden />
                        <span className="sr-only">Ícone {id}</span>
                    </button>
                );
            })}
        </div>
    );
}
