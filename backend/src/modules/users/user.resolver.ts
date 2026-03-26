import { Arg, Mutation, Query } from "type-graphql";
import { UserModel } from "../../models/user.model";
import { UserService } from "./user.service";
import { UpdateUserInput } from "./dto/create-user.input";

export class UserResolver {
    constructor(private readonly userService: UserService) {}
    
    @Query(() => UserModel)
    async user(@Arg("id", () => String) id: string): Promise<UserModel> {
        return this.userService.findById(id);
    }

    @Mutation(() => UserModel)
    async updateUser(@Arg("id", () => String) id: string, @Arg("input", () => UpdateUserInput) input: UpdateUserInput): Promise<UserModel> {
        return this.userService.update(id, input);
    }
}   