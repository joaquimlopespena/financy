import type { ReactNode } from "react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerSimpleProps {
    id: string;
    /** Se definido, mostra rótulo integrado (shadcn Field). Com `Label` externo, omitir. */
    label?: ReactNode;
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export function DatePickerSimple({
    id,
    label,
    value,
    onChange,
    placeholder = "Selecione",
    className,
    disabled,
}: DatePickerSimpleProps) {
    const [calendarOpen, setCalendarOpen] = useState(false);

    function handleSelect(date: Date | undefined) {
        onChange(date);
        setCalendarOpen(false);
    }

    const trigger = (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    id={id}
                    disabled={disabled}
                    className={cn(
                        "h-12 w-full justify-start rounded-lg border-gray-200 bg-white px-3 text-sm font-normal text-gray-900 shadow-none hover:bg-gray-50",
                        !value && "text-gray-400",
                        className,
                    )}
                >
                    {value ? (
                        format(value, "dd/MM/yyyy", { locale: ptBR })
                    ) : (
                        <span>{placeholder}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={handleSelect}
                    defaultMonth={value}
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    );

    if (label != null) {
        return (
            <Field className="w-full">
                <FieldLabel htmlFor={id}>{label}</FieldLabel>
                {trigger}
            </Field>
        );
    }

    return <div className="w-full">{trigger}</div>;
}
