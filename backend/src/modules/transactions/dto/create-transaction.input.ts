import { Field, Float, GraphQLISODateTime, InputType, registerEnumType } from "type-graphql";
import { TransactionType } from "../../../generated/prisma/enums";

registerEnumType(TransactionType, {
    name: "TransactionType",
  });
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

    @Field(() => GraphQLISODateTime)
    transactionDate: Date;

    @Field(() => String)
    categoryId: string;
}