import { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import { useAuthStore } from "@/stores/auth";
import type { Category, CreateCategoryInput, UpdateCategoryInput } from "@/types";
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
                update: (cache, { data: mutationData }) => {
                    const created = (mutationData as { createCategory?: Category } | null | undefined)
                        ?.createCategory;
                    if (!created) return;
                    const existing = cache.readQuery<{ categories: Category[] }>({ query: GET_CATEGORIES });
                    if (!existing) return;
                    const authUser = useAuthStore.getState().user;
                    const newCategory: Category = {
                        ...created,
                        countTransactions: 0,
                        user: {
                            id: authUser?.id ?? "",
                            name: authUser?.name ?? "",
                        },
                    };
                    cache.writeQuery({
                        query: GET_CATEGORIES,
                        data: { categories: [...existing.categories, newCategory] },
                    });
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

export function useCategoryUpdate(options?: UseCategoryCreateOptions) {
    const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY);

    async function submitUpdate(id: string, input: UpdateCategoryInput) {
        try {
            const result = await updateCategory({
                variables: { id, input },

                update: (cache, { data: mutationData }) => {
                    const updated = (mutationData as { updateCategory?: Category } | null | undefined)
                        ?.updateCategory;
                    if (!updated) return;
                    const existing = cache.readQuery<{ categories: Category[] }>({ query: GET_CATEGORIES });
                    if (!existing) return;
                    cache.writeQuery({
                        query: GET_CATEGORIES,
                        data: {
                            categories: existing.categories.map((c) =>
                                c.id === id ? { ...c, ...updated } : c,
                            ),
                        },
                    });
                },
            });
            if (result.error) {
                handleMutationFailure(result.error);
                return;
            }

            const data = result.data as { updateCategory?: Category } | undefined;
            if (data?.updateCategory) {
                toast.success("Categoria atualizada com sucesso");
                options?.onOpenChange?.(false);
                options?.onSuccess?.();
            }
        } catch (error: unknown) {
            handleMutationFailure(error);
        }
    }

    return { submitUpdate, loading };
}

export function useCategoryDelete() { 
    const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY);

    async function submitDelete(id: string) {
        try {
            const result = await deleteCategory({
                variables: { id },
                update: (cache, { data: mutationData }) => {
                    const ok = (mutationData as { deleteCategory?: boolean } | undefined)?.deleteCategory;
                    if (!ok) return;
                    const existing = cache.readQuery<{ categories: Category[] }>({ query: GET_CATEGORIES });
                    if (!existing) return;
                    cache.writeQuery({
                        query: GET_CATEGORIES,
                        data: { categories: existing.categories.filter((c) => c.id !== id) },
                    });
                },
            });
            if (result.error) {
                handleMutationFailure(result.error);
                return;
            }

            const data = result.data as { deleteCategory?: boolean } | undefined;
            if (data?.deleteCategory) {
                toast.success("Categoria excluída com sucesso");
            }
        } catch (error: unknown) {
            handleMutationFailure(error);
        }
    }

    return { submitDelete, loading };
}