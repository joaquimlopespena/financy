import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context"
import { getStoredAuthToken } from "../auth-token";

const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql",
});

const authLink = new SetContextLink((prevContext: any) => {
    const token = getStoredAuthToken()
    return {
        headers: {
            ...prevContext.headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache()
})