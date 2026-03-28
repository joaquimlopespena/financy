import { CREATE_CATEGORY } from "@/lib/graphql/mutations/category";
import { useAuthStore } from "@/stores/auth";
import type { CreateCategoryInput } from "@/types";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";

export interface UseCategoryCreateOptions {
    /** Chamado após criar com sucesso (ex.: refetch da lista). */
    onSuccess?: () => void;
    /** Fecha o diálogo após sucesso. */
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

function handleMutationFailure(error: unknown) {
    const gqlErrors =
        error &&
        typeof error === "object" &&
        "graphQLErrors" in error &&
        Array.isArray((error as { graphQLErrors: { message: string }[] }).graphQLErrors)
            ? (error as { graphQLErrors: { message: string }[] }).graphQLErrors
            : [];
    const unauthorized = gqlErrors.some((e) => e.message === "Unauthorized");
    if (unauthorized) {
        toast.error("Sessão inválida ou expirada. Entre de novo.");
        useAuthStore.getState().logout();
        return;
    }
    const msg = getGraphqlErrorMessage(error) ?? "Erro ao criar categoria";
    toast.error(msg);
}

/**
 * Mutation de criação: fecha a modal e dispara callbacks só após resposta de sucesso da API.
 */
export function useCategoryCreate(options?: UseCategoryCreateOptions) {
    const [createCategory, { loading }] = useMutation(CREATE_CATEGORY);

    async function submitCreate(input: CreateCategoryInput) {
        try {
            const result = await createCategory({
                variables: {
                    input: {
                        name: input.name,
                        description: input.description || undefined,
                        icon: input.icon || undefined,
                        color: input.color || undefined,
                    },
                },
            });

            if (result.error) {
                handleMutationFailure(result.error);
                return;
            }

            const data = result.data as { createCategory?: { id: string } } | undefined;
            if (data?.createCategory) {
                toast.success("Categoria criada com sucesso");
                options?.onOpenChange?.(false);
                options?.onSuccess?.();
            }
        } catch (error: unknown) {
            handleMutationFailure(error);
        }
    }

    return { submitCreate, loading };
}
