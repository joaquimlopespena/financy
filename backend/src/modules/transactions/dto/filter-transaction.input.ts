import { Field, Float, GraphQLISODateTime, InputType, Int, registerEnumType } from "type-graphql";
import { TransactionType } from "../../../generated/prisma/enums";

registerEnumType(TransactionType, {
    name: "TransactionType",
  });
@InputType()
export class FilterTransactionInput {
    @Field(() => String, { nullable: true })
    search?: string;

    @Field(() => TransactionType, { nullable: true })
    type?: TransactionType;

    @Field(() => String, { nullable: true })
    categoryId?: string;

    @Field(() => String, { nullable: true })
    date?: string;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}