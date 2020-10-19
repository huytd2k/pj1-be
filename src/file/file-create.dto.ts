import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FileCreateDto {
    @Field(type => String)
    filename: string;

    @Field(type => Int)
    uploadUserId: number;    

    @Field(type => String)
    serverLink: string;
} 