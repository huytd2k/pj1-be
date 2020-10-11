import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class UserCreateDTO{
    @Field( type => String)
    username: string;

    @Field( type => String)
    password: string;
}