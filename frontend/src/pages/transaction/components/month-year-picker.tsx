import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, startOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown } from "lucide-react";

const MONTHS_PT: { value: string; label: string }[] = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
];

function formatMonthYearLabel(d: Date): string {
    const raw = format(startOfMonth(d), "MMMM / yyyy", { locale: ptBR });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function yearOptions(from: number, to: number): { value: string; label: string }[] {
    const out: { value: string; label: string }[] = [];
    for (let y = from; y <= to; y++) {
        out.push({ value: String(y), label: String(y) });
    }
    return out;
}

export interface MonthYearPickerProps {
    /** Qualquer data dentro do mês desejado; o componente usa o início do mês. */
    value: Date;
    onChange: (monthStart: Date) => void;
    id?: string;
}

/**
 * Campo estilo select (Figma): só mês e ano no painel — sem grade de dias.
 */
export function MonthYearPicker({ value, onChange, id }: MonthYearPickerProps) {
    const monthStart = startOfMonth(value);
    const month = String(monthStart.getMonth() + 1);
    const year = String(monthStart.getFullYear());
    const yearNow = new Date().getFullYear();
    const years = yearOptions(yearNow - 15, yearNow + 10);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    id={id}
                    variant="outline"
                    className={cn(
                        "h-10 w-full justify-between border border-gray-200 bg-white px-3 font-normal text-gray-900 shadow-none ring-0 hover:bg-white focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-brand-base/25",
                    )}
                >
                    <span className="truncate text-left">{formatMonthYearLabel(value)}</span>
                    <ChevronDown className="size-4 shrink-0 text-gray-500" aria-hidden />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[min(calc(100vw-2rem),18rem)] border border-gray-200 p-3 shadow-md"
                align="start"
            >
                <div className="flex flex-col gap-3">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-gray-500">Mês</Label>
                        <Select
                            value={month}
                            onValueChange={(v) => {
                                const m = Number.parseInt(v, 10);
                                const y = monthStart.getFullYear();
                                onChange(startOfMonth(new Date(y, m - 1, 1)));
                            }}
                        >
                            <SelectTrigger className="h-10 w-full border-gray-200 bg-white text-gray-900">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border border-gray-200 bg-white">
                                {MONTHS_PT.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-gray-500">Ano</Label>
                        <Select
                            value={year}
                            onValueChange={(v) => {
                                const y = Number.parseInt(v, 10);
                                const m = monthStart.getMonth();
                                onChange(startOfMonth(new Date(y, m, 1)));
                            }}
                        >
                            <SelectTrigger className="h-10 w-full border-gray-200 bg-white text-gray-900">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 border border-gray-200 bg-white">
                                {years.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
