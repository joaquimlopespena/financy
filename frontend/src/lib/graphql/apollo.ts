import { useAuthStore } from "@/stores/auth";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { SetContextLink } from "@apollo/client/link/context";
import { toast } from "sonner";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql",
});

const authLink = new SetContextLink((prevContext: any) => {
    const token = useAuthStore.getState().token;
    return {
        headers: {
            ...prevContext.headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

function logoutIfUnauthorized(errors: ReadonlyArray<{ message: string }>) {
    const unauthorized = errors.some((e) => e.message === "Unauthorized");
    if (unauthorized) {
        toast.error("Sessão inválida ou expirada. Entre de novo.");
        useAuthStore.getState().logout();
        return true;
    }
    return false;
}

/** Desloga em qualquer resposta GraphQL com erro `Unauthorized` (queries e mutations). */
const unauthorizedLink = new ApolloLink((operation, forward) => {
    return forward(operation).pipe(
        tap((result) => {
            if (
                result &&
                typeof result === "object" &&
                "errors" in result &&
                Array.isArray((result as { errors: { message: string }[] }).errors)
            ) {
                logoutIfUnauthorized((result as { errors: { message: string }[] }).errors);
            }
        }),
        catchError((err) => {
            if (CombinedGraphQLErrors.is(err)) {
                logoutIfUnauthorized(err.errors);
            }
            return throwError(() => err);
        }),
    );
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([unauthorizedLink, authLink, httpLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    categories: {
                        merge(_existing, incoming) {
                            return incoming;
                        },
                    },
                    transactions: {
                        merge(_existing, incoming) {
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});