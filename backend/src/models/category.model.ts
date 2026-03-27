import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
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

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @Field(() => GraphQLISODateTime)
    updatedAt: Date;

    @Field(() => UserModel)
    user: UserModel;

    @Field(() => [TransactionModel])
    transactions: TransactionModel[];

}