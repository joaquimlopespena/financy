import { GraphQLContext } from "../graphql/context";

export const IsAuth = async ({ context }: { context: GraphQLContext }, next: any) => {

    if (!context.user) {
        throw new Error('Unauthorized');
    }
    return next();
}