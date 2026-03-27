import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryInput {
    @Field(() => String)
    name: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date;
}

