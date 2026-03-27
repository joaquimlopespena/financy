import { Field } from "type-graphql";

export class CreateCategoryInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    userId: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;
}

