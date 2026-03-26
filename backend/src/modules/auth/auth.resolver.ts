import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthService } from "./auth.service";
import { LoginInput, RegisterInput } from "./dto/login.input";
import { LoginOutput, RegisterOutput } from "./dto/auth.output";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => RegisterOutput)
    async register(
        @Arg("input", () => RegisterInput) input: RegisterInput
    ): Promise<RegisterOutput> {
        return this.authService.register(input);
    }

    @Mutation(() => LoginOutput)
    async login(
        @Arg("input", () => LoginInput) input: LoginInput
    ): Promise<LoginOutput> {
        return this.authService.login(input);
    }
}
