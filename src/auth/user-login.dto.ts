import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserLoginDTO {
    @Field(Type => String)
    username: string;

    @Field(Type => String)
    password: string;
}