import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

export type TransactionKind = "expense" | "income";

interface TransactionTypeSegmentProps {
    value: TransactionKind;
    onValueChange: (value: TransactionKind) => void;
    className?: string;
}

export function TransactionTypeSegment({ value, onValueChange, className }: TransactionTypeSegmentProps) {
    return (
        <div
            role="radiogroup"
            aria-label="Tipo de transação"
            className={cn(
                "flex w-full gap-1 rounded-xl border border-gray-200 bg-white p-2",
                className,
            )}
        >
            <button
                type="button"
                role="radio"
                aria-checked={value === "expense"}
                onClick={() => onValueChange("expense")}
                className={cn(
                    "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:min-h-12",
                    value === "expense"
                        ? "border border-red-base bg-white text-gray-900"
                        : "border border-transparent bg-transparent text-gray-500",
                )}
            >
                <span
                    className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border-2 bg-transparent",
                        value === "expense" ? "border-red-base" : "border-gray-300",
                    )}
                    aria-hidden
                >
                    <ArrowDown
                        className={cn(
                            "size-3.5",
                            value === "expense" ? "text-red-base" : "text-gray-400",
                        )}
                        strokeWidth={2.5}
                    />
                </span>
                <span className="truncate">Despesa</span>
            </button>

            <button
                type="button"
                role="radio"
                aria-checked={value === "income"}
                onClick={() => onValueChange("income")}
                className={cn(
                    "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:min-h-12",
                    value === "income"
                        ? "border border-brand-base bg-white text-gray-900"
                        : "border border-transparent bg-transparent text-gray-500",
                )}
            >
                <span
                    className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border-2 bg-transparent",
                        value === "income" ? "border-brand-base" : "border-gray-300",
                    )}
                    aria-hidden
                >
                    <ArrowUp
                        className={cn(
                            "size-3.5",
                            value === "income" ? "text-brand-base" : "text-gray-400",
                        )}
                        strokeWidth={2.5}
                    />
                </span>
                <span className="truncate">Receita</span>
            </button>
        </div>
    );
}
