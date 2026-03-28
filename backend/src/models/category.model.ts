import { Field, Float, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { TransactionModel } from "./transaction.model";

@ObjectType()
export class CategoryModel {

    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    userId: string;

    @Field(() => String, { nullable: true })
    color?: string;

    @Field(() => String, { nullable: true })
    icon?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt: Date;

    @Field(() => UserModel)
    user: UserModel;

    @Field(() => [TransactionModel])
    transactions: TransactionModel[];

    @Field(() => Int)
    countTransactions: number;

    @Field(() => Float)
    totalAmount: number;
}