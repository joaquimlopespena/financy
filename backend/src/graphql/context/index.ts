import { ExpressContextFunctionArgument } from "@as-integrations/express5"
import { JwtPayload, verifyJwt } from "../../shared/utils/jwt";

export type GraphQLContext = {
    user: string | undefined;
    token: string | undefined;
    req: ExpressContextFunctionArgument["req"];
    res: ExpressContextFunctionArgument["res"];
};

export const buildContext = async ({
    req,
    res
}: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
    const authHeader = req.headers.authorization;
    let user: string | undefined;
    let token: string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring('Bearer '.length);

        try {
            const decoded = verifyJwt(token) as JwtPayload;
            user = decoded.id;
        } catch (error) {
            console.error(error);
        }
    }


    return { user, token, req, res };
}
