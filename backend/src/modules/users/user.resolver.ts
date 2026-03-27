import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../../models/user.model";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { IsAuth } from "../../middlewares/auth.middleware";
import { UpdateUserInput } from "./dto/create-user.input";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
    private userService = new UserService();

    @Query(() => UserModel)
    async user(@Arg("id", () => String) id: string): Promise<UserModel> {
        return this.userService.findById(id);
    }

    @Mutation(() => UserModel)
    @UseMiddleware(IsAuth)
    async updateUser(
        @Arg("input", () => UpdateUserInput) input: UpdateUserInput,
        @GqlUser() user: UserModel | null
    ): Promise<UserModel> {
        console.log(user);
        if (!user) {
            throw new Error("User not found");
        }
        return this.userService.update(user.id, input);
    }
}   