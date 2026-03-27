import { Field, Float } from "type-graphql";
import { UserModel } from "./user.model";
import { CategoryModel } from "./category.model";

export class TransactionModel {
    @Field(() => String)
    id: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;
    
    @Field(() => Float)
    amount: number;

    @Field(() => String)
    type: string;

    @Field(() => Date)
    transactionDate: Date;

    @Field(() => String)
    userId: string;

    @Field(() => String)
    categoryId: string;

    @Field(() => UserModel)
    user: UserModel;

    @Field(() => CategoryModel)
    category: CategoryModel;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
