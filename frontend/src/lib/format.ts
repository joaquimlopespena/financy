export function formatBrl(value: number): string {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

/** Centavos (inteiro) → texto para input mascarado, ex. `1050` → `"10,50"` (sem prefixo R$). */
export function formatCentsToBrlInput(cents: number): string {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(cents / 100);
}

/**
 * Interpreta o que o usuário digitou: só dígitos contam; valor = centavos.
 * Ex.: digitar "1050" → 1050 centavos → R$ 10,50.
 */
export function parseCurrencyDigitsToCents(raw: string): number {
    const digits = raw.replace(/\D/g, "");
    if (digits === "") return 0;
    const n = Number(digits);
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.min(Math.trunc(n), 9_999_999_999_99);
}
