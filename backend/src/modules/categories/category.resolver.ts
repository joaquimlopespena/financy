import { Arg, Field, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../../models/category.model";
import { CreateCategoryInput } from "./dto/create-category.input";
import { CategoryService } from "./category.service";
import { IsAuth } from "../../middlewares/auth.middleware";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { UserModel } from "../../models/user.model";
import { UpdateCategoryInput } from "./dto/update-category.input";
import { TransactionModel } from "../../models/transaction.model";
import { UserService } from "../users/user.service";
import { TransactionService } from "../transactions/transaction.service";

@Resolver(() => CategoryModel)
export class CategoryResolver {
    private categoryService = new CategoryService();
    private userService = new UserService();
    private transactionService = new TransactionService();

    @Mutation(() => CategoryModel)
    @UseMiddleware(IsAuth)
    async createCategory(
        @Arg("input", () => CreateCategoryInput) input: CreateCategoryInput,
        @GqlUser() user: UserModel
    ): Promise<CategoryModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.categoryService.create(input, user.id);
    }

    @Query(() => [CategoryModel])
    @UseMiddleware(IsAuth)
    async categories(@GqlUser() user: UserModel): Promise<CategoryModel[]> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.categoryService.findByUserId(user.id);
    }

    @Query(() => CategoryModel)
    @UseMiddleware(IsAuth)
    async category(@Arg("id", () => String) id: string, @GqlUser() user: UserModel): Promise<CategoryModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.categoryService.findById(id, user.id);
    }

    @Mutation(() => CategoryModel)
    @UseMiddleware(IsAuth)
    async updateCategory(@Arg("id", () => String) id: string, @Arg("input", () => UpdateCategoryInput) input: UpdateCategoryInput, @GqlUser() user: UserModel): Promise<CategoryModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.categoryService.update(id, user.id, input);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteCategory(@Arg("id", () => String) id: string, @GqlUser() user: UserModel): Promise<boolean> {
        if (!user) {
            throw new Error("User not found");
        }
        await this.categoryService.delete(id, user.id);
        return true;
    }

    @Field(() => CategoryModel)
    @UseMiddleware(IsAuth)
    async categoryTransactions(@Arg("id", () => String) id: string, @GqlUser() user: UserModel): Promise<TransactionModel[]> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.categoryService.findTransactionsById(id, user.id);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() category: CategoryModel): Promise<UserModel> {
        const row = await this.categoryService.findById(category.id, category.userId);
        if (!row) throw new Error('Category not found');
        return await this.userService.findById(row.userId);
    }

    @FieldResolver(() => [TransactionModel])    
    async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
        const row = await this.categoryService.findById(category.id, category.userId);
        if (!row) throw new Error('Category not found');
        return await this.transactionService.findByCategoryId(row.id, category.userId);
    }

    @FieldResolver(() => [CategoryModel])
    async countTransactions(@Root() category: CategoryModel): Promise<number> {
        const row = await this.categoryService.findById(category.id, category.userId);
        if (!row) throw new Error('Category not found');
        return await this.transactionService.countByCategoryId(row.id, category.userId);
    }
}
