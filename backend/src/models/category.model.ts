import { Field } from "type-graphql";
import { UserModel } from "./user.model";

export class CategoryModel {

    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    userId: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => UserModel)
    user: UserModel;

}