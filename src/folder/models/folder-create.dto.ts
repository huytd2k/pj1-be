import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class FolderCreateDTO {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(_type => String)
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    uploadUserId: number;


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(_type => Int, {nullable: true})
    parentFolderId: number;
}