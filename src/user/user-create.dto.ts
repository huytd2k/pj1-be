import { Field, InputType } from "@nestjs/graphql";
import { Length, Validate } from "class-validator";
import { UniqueUsernameValidator } from "src/validate/unique-username.validator";

@InputType()
export default class UserCreateDTO{
    @Length(8,20)
    @Validate(UniqueUsernameValidator, {message: ""})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field( _type => String)
    username: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field( _type => String)
    password: string;
}