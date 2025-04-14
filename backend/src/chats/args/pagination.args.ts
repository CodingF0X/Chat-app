import { Field, Int } from "@nestjs/graphql";

export class PaginationArgs {
    @Field(() => Int)
    skip:number;
    @Field(() => Int)
    limit:number
}