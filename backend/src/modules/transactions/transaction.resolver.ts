import { Arg, Field, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { GqlUser } from "../../graphql/decorators/user.decorator";
import { PaginatedTransactionModel, TransactionModel } from "../../models/transaction.model";
import { IsAuth } from "../../middlewares/auth.middleware";
import { CreateTransactionInput } from "./dto/create-transaction.input";
import { UserModel } from "../../models/user.model";
import { TransactionService } from "./transaction.service";
import { UserService } from "../users/user.service";
import { CategoryService } from "../categories/category.service";
import { UpdateTransactionInput } from "./dto/update-transaction.input";
import { FilterTransactionInput } from "./dto/filter-transaction.input";
import { CategoryModel } from "../../models/category.model";

@Resolver(() => TransactionModel)
export class TransactionResolver {
    private transactionService = new TransactionService();
    private userService = new UserService();
    private categoryService = new CategoryService();

    @Mutation(() => TransactionModel)
    @UseMiddleware(IsAuth)
    async createTransaction(
        @Arg("input", () => CreateTransactionInput) input: CreateTransactionInput,
        @GqlUser() user: UserModel
    ): Promise<TransactionModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.transactionService.create(input, user.id);
    }

    @Query(() => PaginatedTransactionModel)
    @UseMiddleware(IsAuth)
    async paginte(
        @GqlUser() user: UserModel,
        @Arg("filter", () => FilterTransactionInput) filter: FilterTransactionInput,
    ): Promise<PaginatedTransactionModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.transactionService.paginate(
            user.id,
            filter.page,
            filter.limit,
            filter.search ?? null,
            filter.type ?? null,
            filter.categoryId ?? null,
            filter.date ?? null,
        );
    }

    @Query(() => [TransactionModel])
    @UseMiddleware(IsAuth)
    async transactions(@GqlUser() user: UserModel): Promise<TransactionModel[]> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.transactionService.findByUserId(user.id);
    }

    @Query(() => TransactionModel)
    @UseMiddleware(IsAuth)
    async transaction(@Arg("id", () => String) id: string, @GqlUser() user: UserModel): Promise<TransactionModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.transactionService.findById(id, user.id);
    }

    @Mutation(() => TransactionModel)
    @UseMiddleware(IsAuth)
    async updateTransaction(@Arg("id", () => String) id: string, @Arg("input", () => UpdateTransactionInput) input: UpdateTransactionInput, @GqlUser() user: UserModel): Promise<TransactionModel> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.transactionService.update(id, user.id, input);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(IsAuth)
    async deleteTransaction(@Arg("id", () => String) id: string, @GqlUser() user: UserModel): Promise<boolean> {
        if (!user) {
            throw new Error("User not found");
        }
        await this.transactionService.delete(id, user.id);
        return true;
    }

    @Field(() => [TransactionModel])
    @UseMiddleware(IsAuth)
    async transactionsByCategory(@Arg("categoryId", () => String) categoryId: string, @GqlUser() user: UserModel): Promise<TransactionModel[]> {
        if (!user) {
            throw new Error("User not found");
        }
        return this.transactionService.findByCategoryId(categoryId, user.id);
    }

    @FieldResolver(() => CategoryModel)
    async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
        const row = await this.transactionService.findById(transaction.id, transaction.userId);
        if (!row) throw new Error('Transaction not found');
        return await this.categoryService.findById(row.categoryId, row.userId);
    }

    @FieldResolver(() => UserModel)
    async user(@Root() transaction: TransactionModel): Promise<UserModel> {
        const row = await this.transactionService.findById(transaction.id, transaction.userId);
        if (!row) throw new Error('Transaction not found');
        return await this.userService.findById(row.userId);
    }
}
