import { UPDATE_USER_MUTATION } from "@/lib/graphql/mutations/user";
import { useMutation } from "@apollo/client/react";
import { toast } from "sonner";
import type { UpdateUserInput, User } from "@/types";
import { useAuthStore } from "./auth";

function getGraphqlErrorMessage(error: unknown): string | undefined {
    if (error && typeof error === "object" && "graphQLErrors" in error) {
        const errs = (error as { graphQLErrors?: { message?: string }[] }).graphQLErrors;
        const first = errs?.[0]?.message;
        if (first) return first;
    }
    if (error instanceof Error) return error.message;
    return undefined;
}

/** Mantém o header/perfil alinhados ao nome após `updateUser` (só nome é editável). */
function applyUpdatedUserToSession(updated: Pick<User, "id" | "name">) {
    useAuthStore.setState((state) => {
        if (state.user?.id !== updated.id) return state;
        return {
            user: {
                ...state.user,
                name: updated.name,
            },
        };
    });
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
        toast.error("Sessão inválida ou expirada. Entre de novo.");
        useAuthStore.getState().logout();
        return;
    }
    const msg = getGraphqlErrorMessage(error) ?? fallbackMessage;
    toast.error(msg);
}


export function useUserUpdate() {

    const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);

    async function submitUpdate(input: UpdateUserInput) {
        try {
            const result = await updateUser({
                variables: {
                    input: { name: input.name ?? undefined },
                },
                update: (_cache, { data: mutationData }) => {
                    const updated = (mutationData as { updateUser?: User } | null | undefined)?.updateUser;
                    if (!updated) return;
                    applyUpdatedUserToSession(updated);
                },
            });
            
            if (result.error) {
                handleMutationFailure(result.error, "Erro ao atualizar usuário");
                return false;
            }
            const data = result.data as { updateUser?: User } | undefined;
            if (data?.updateUser) {
                toast.success("Usuário atualizado com sucesso");
                return true;
            }
            return false;
        } catch (error: unknown) {
            handleMutationFailure(error, "Erro ao atualizar usuário");
            return false;
        }
    }

    return { submitUpdate, loading };
}