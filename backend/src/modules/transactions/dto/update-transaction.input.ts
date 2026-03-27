import { Field, Float, InputType } from "type-graphql";
import { TransactionType } from "../../../generated/prisma/enums";

@InputType()
export class UpdateTransactionInput {
    @Field(() => String)
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Float, { nullable: true })
    amount?: number;

    @Field(() => TransactionType, { nullable: true })
    type?: TransactionType;

    @Field(() => Date, { nullable: true })
    transactionDate?: Date;

    @Field(() => String, { nullable: true })
    categoryId?: string;
}
