import { Field, Float, InputType } from "type-graphql";
import { TransactionType } from "../../../generated/prisma/enums";

@InputType()
export class CreateTransactionInput {
    @Field(() => String)
    title: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Float)
    amount: number;

    @Field(() => TransactionType)
    type: TransactionType;

    @Field(() => Date)
    transactionDate: Date;

    @Field(() => String)
    userId: string;

    @Field(() => String)
    categoryId: string;
}