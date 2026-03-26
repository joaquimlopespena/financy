import { Arg, Mutation, Resolver } from "type-graphql";
import { authService } from "./auth.service";
import { LoginInput, RegisterInput } from "./dto/login.input";
import { LoginOutput, RegisterOutput } from "./dto/auth.output";

@Resolver()
export class AuthResolver {
    @Mutation(() => RegisterOutput)
    async register(
        @Arg("input", () => RegisterInput) input: RegisterInput
    ): Promise<RegisterOutput> {
        return authService.register(input);
    }

    @Mutation(() => LoginOutput)
    async login(
        @Arg("input", () => LoginInput) input: LoginInput
    ): Promise<LoginOutput> {
        return authService.login(input);
    }
}
