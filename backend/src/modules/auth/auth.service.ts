import { UserService } from "../users/user.service";
import { LoginOutput, RegisterOutput } from "./dto/auth.output";
import { LoginInput, RegisterInput } from "./dto/login.input";
import { signJwt } from "../../shared/utils/jwt";
import { comparePassword } from "../../shared/utils/hash";

export class AuthService {
    private userService = new UserService();

    async register(input: RegisterInput): Promise<RegisterOutput> {
        const user = await this.userService.create(input);
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not set");
        }
        const token = signJwt({ id: user.id, email: user.email }, "1d");
        const refreshToken = signJwt({ id: user.id, email: user.email }, "7d");
        return {
            token,
            refreshToken,
            user,
        };
    }

    async login(input: LoginInput): Promise<LoginOutput> {
        const user = await this.userService.findByEmail(input.email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await comparePassword(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = signJwt({ id: user.id, email: user.email }, "1d");
        const refreshToken = signJwt({ id: user.id, email: user.email }, "7d");
        return {
            token,
            refreshToken,
            user,
        };
    }
}
