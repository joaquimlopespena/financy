import {
    CREATE_TRANSACTION,
    DELETE_TRANSACTION,
    UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/transaction";
import { GET_DASHBOARD } from "@/lib/graphql/queries/dashboard";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import type { CreateTransactionInput, Transaction, UpdateTransactionInput } from "@/types";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

export interface UseTransactionMutationOptions {
    onSuccess?: () => void;
    onOpenChange?: (open: boolean) => void;
}

function getGraphqlErrorMessage(error: unknown): string | undefined {
    if (error && typeof error === "object" && "graphQLErrors" in error) {
        const errs = (error as { graphQLErrors?: { message?: string }[] }).graphQLErrors;
        const first = errs?.[0]?.message;
        if (first) return first;
    }
    if (error instanceof Error) return error.message;
    return undefined;
}

function handleMutationFailure(error: unknown, fallbackMessage = "Erro ao processar transação") {
    const gqlErrors =
        error &&
        typeof error === "object" &&
        "graphQLErrors" in error &&
        Array.isArray((error as { graphQLErrors: { message: string }[] }).graphQLErrors)
            ? (error as { graphQLErrors: { message: string }[] }).graphQLErrors
            : [];
    const unauthorized = gqlErrors.some((e) => e.message === "Unauthorized");
    if (unauthorized) {
        return;
    }
    const msg = getGraphqlErrorMessage(error) ?? fallbackMessage;
    toast.error(msg);
}

export function useTransactionCreate(options?: UseTransactionMutationOptions) {
    const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION);

    async function submitCreate(input: CreateTransactionInput) {
        try {
            const result = await createTransaction({
                variables: {
                    input: {
                        title: input.title,
                        description: input.description ?? undefined,
                        amount: input.amount,
                        type: input.type,
                        transactionDate: input.transactionDate,
                        categoryId: input.categoryId,
                    },
                },
                refetchQueries: [{ query: GET_DASHBOARD }],
                awaitRefetchQueries: true,
                update: (cache, { data: mutationData }) => {
                    const created = (mutationData as { createTransaction?: Transaction } | null | undefined)
                        ?.createTransaction;
                    if (!created) return;
                    const existing = cache.readQuery<{ transactions: Transaction[] }>({ query: GET_TRANSACTIONS });
                    if (!existing) return;
                    cache.writeQuery({
                        query: GET_TRANSACTIONS,
                        data: { transactions: [...existing.transactions, created] },
                    });
                },
            });

            if (result.error) {
                handleMutationFailure(result.error, "Erro ao criar transação");
                return;
            }

            const data = result.data as { createTransaction?: { id: string } } | undefined;
            if (data?.createTransaction) {
                toast.success("Transação criada com sucesso");
                options?.onOpenChange?.(false);
                options?.onSuccess?.();
            }
        } catch (error: unknown) {
            handleMutationFailure(error, "Erro ao criar transação");
        }
    }

    return { submitCreate, loading };
}

export function useTransactionUpdate(options?: UseTransactionMutationOptions) {
    const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION);

    async function submitUpdate(id: string, input: UpdateTransactionInput) {
        try {
            const result = await updateTransaction({
                variables: {
                    id,
                    input: {
                        title: input.title ?? undefined,
                        description: input.description ?? undefined,
                        amount: input.amount ?? undefined,
                        type: input.type ?? undefined,
                        transactionDate: input.transactionDate ?? undefined,
                        categoryId: input.categoryId ?? undefined,
                    },
                },
                refetchQueries: [{ query: GET_DASHBOARD }],
                awaitRefetchQueries: true,
                update: (cache, { data: mutationData }) => {
                    const updated = (mutationData as { updateTransaction?: Transaction } | null | undefined)
                        ?.updateTransaction;
                    if (!updated) return;
                    const existing = cache.readQuery<{ transactions: Transaction[] }>({ query: GET_TRANSACTIONS });
                    if (!existing) return;
                    cache.writeQuery({
                        query: GET_TRANSACTIONS,
                        data: {
                            transactions: existing.transactions.map((t) =>
                                t.id === id ? { ...t, ...updated } : t,
                            ),
                        },
                    });
                },
            });
            if (result.error) {
                handleMutationFailure(result.error, "Erro ao atualizar transação");
                return;
            }

            const data = result.data as { updateTransaction?: Transaction } | undefined;
            if (data?.updateTransaction) {
                toast.success("Transação atualizada com sucesso");
                options?.onOpenChange?.(false);
                options?.onSuccess?.();
            }
        } catch (error: unknown) {
            handleMutationFailure(error, "Erro ao atualizar transação");
        }
    }

    return { submitUpdate, loading };
}

export function useTransactionDelete() {
    const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION);

    async function submitDelete(id: string): Promise<boolean> {
        try {
            const result = await deleteTransaction({
                variables: { id },
                refetchQueries: [{ query: GET_DASHBOARD }],
                awaitRefetchQueries: true,
                update: (cache, { data: mutationData }) => {
                    const ok = (mutationData as { deleteTransaction?: boolean } | undefined)?.deleteTransaction;
                    if (!ok) return;
                    const existing = cache.readQuery<{ transactions: Transaction[] }>({ query: GET_TRANSACTIONS });
                    if (!existing) return;
                    cache.writeQuery({
                        query: GET_TRANSACTIONS,
                        data: { transactions: existing.transactions.filter((t) => t.id !== id) },
                    });
                },
            });
            if (result.error) {
                handleMutationFailure(result.error, "Erro ao excluir transação");
                return false;
            }

            const data = result.data as { deleteTransaction?: boolean } | undefined;
            if (data?.deleteTransaction) {
                toast.success("Transação excluída com sucesso");
                return true;
            }
            return false;
        } catch (error: unknown) {
            handleMutationFailure(error, "Erro ao excluir transação");
            return false;
        }
    }

    return { submitDelete, loading };
}
