import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatBrl } from "@/lib/format";
import type { Transaction } from "@/lib/mock";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronRight, PlusCircle } from "lucide-react";
import { ModalFromTransaction } from "@/pages/transaction/components/modal-from-transaction.tsx";
import { useState } from "react";

type Tone = Transaction["tone"];

const toneIconBox: Record<Tone, string> = {
    green: "bg-green-light text-green-dark",
    blue: "bg-blue-light text-blue-dark",
    purple: "bg-purple-light text-purple-dark",
    orange: "bg-orange-light text-orange-dark",
    mint: "bg-green-light text-green-dark",
};

const toneBadge: Record<Tone, string> = {
    green: "border-0 bg-green-light text-green-dark hover:bg-green-light",
    blue: "border-0 bg-blue-light text-blue-dark hover:bg-blue-light",
    purple: "border-0 bg-purple-light text-purple-dark hover:bg-purple-light",
    orange: "border-0 bg-orange-light text-orange-dark hover:bg-orange-light",
    mint: "border-0 bg-green-light text-green-dark hover:bg-green-light",
};

interface RecentTransactionsCardProps {
    transactions: Transaction[];
}

export function RecentTransactionsCard({ transactions }: RecentTransactionsCardProps) {
    const [open, setOpen] = useState(false)
    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }
    const handleSuccess = () => {
        setOpen(false)
    }
    return (
        <Card className="min-w-0 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-0">
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-gray-200 px-6 pb-4 pt-6">
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Transações recentes
                </CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto shrink-0 gap-1 px-2 font-semibold text-brand-base hover:bg-transparent hover:text-brand-dark"
                >
                    Ver todas
                    <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
                </Button>
            </CardHeader>

            <CardContent className="divide-y divide-gray-200 p-0">
                {transactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="grid grid-cols-1 items-center gap-3 px-4 py-4 transition-colors hover:bg-gray-50 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-6"
                    >
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                            <div
                                className={cn(
                                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                    toneIconBox[tx.tone],
                                )}
                            >
                                <tx.Icon className="size-5" strokeWidth={2} aria-hidden />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900">{tx.title}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>

                        <Badge
                            variant="secondary"
                            className={cn(
                                "w-fit justify-self-start px-2.5 py-1 text-xs font-medium lg:justify-self-center",
                                toneBadge[tx.tone],
                            )}
                        >
                            {tx.category}
                        </Badge>

                        <div className="flex items-center justify-end gap-2 justify-self-end pl-[52px] lg:pl-0">
                            <span className="text-sm font-bold tabular-nums text-gray-900">
                                {tx.positive ? "+" : "−"} {formatBrl(Math.abs(tx.amount))}
                            </span>
                            <span
                                className={cn(
                                    "flex size-7 shrink-0 items-center justify-center rounded-full",
                                    tx.positive ? "bg-green-light" : "bg-red-light",
                                )}
                                aria-hidden
                            >
                                {tx.positive ? (
                                    <ArrowUp className="size-3.5 text-green-base" strokeWidth={2.5} />
                                ) : (
                                    <ArrowDown className="size-3.5 text-red-base" strokeWidth={2.5} />
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </CardContent>

            <CardFooter className="border-t border-gray-200 p-0">
                <Button
                    onClick={() => setOpen(true)}
                    variant="ghost"
                    className="h-auto w-full gap-2 rounded-none py-4 font-semibold text-brand-base hover:bg-gray-50 hover:text-brand-dark"
                >
                    <PlusCircle className="size-4" strokeWidth={2} aria-hidden />
                    Nova transação
                </Button>
            </CardFooter>
            <ModalFromTransaction open={open} onOpenChange={handleOpenChange} onSuccess={handleSuccess} />
        </Card>
    );
}
