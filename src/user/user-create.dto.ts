import { Field, InputType } from "@nestjs/graphql";
import { Length, Validate } from "class-validator";
import { UniqueUsernameValidator } from "src/validate/unique-username.validator";

@InputType()
export default class UserCreateDTO{
    @Length(8,20)
    @Validate(UniqueUsernameValidator, {message: ""})
    @Field( type => String)
    username: string;

    @Field( type => String)
    password: string;
}