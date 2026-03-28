import { Field, Float, GraphQLISODateTime, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model";
import { CategoryModel } from "./category.model";

@ObjectType()
export class DashboardModel {

    @Field(() => Float)
    total_balance: number;
    @Field(() => Float)
    total_income: number;
    @Field(() => Float)
    total_expenses: number;

    @Field(() => [TransactionModel])
    transactions: TransactionModel[];

    @Field(() => [CategoryModel])
    categories: CategoryModel[];
}