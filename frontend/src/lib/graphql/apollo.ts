import { useAuthStore } from "@/stores/auth";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context"

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
})

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
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