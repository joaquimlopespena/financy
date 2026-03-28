import { Field, Float, GraphQLISODateTime, InputType, Int } from "type-graphql";

@InputType()
export class DashboardInput {

    @Field(() => Float)
    total_balance: number;

    @Field(() => Float)
    total_income: number;

    @Field(() => Float)
    total_expenses: number;

    @Field(() => GraphQLISODateTime)
    startDate: Date;

    @Field(() => GraphQLISODateTime)
    endDate: Date;
}