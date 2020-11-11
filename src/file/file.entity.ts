
import { Int, ObjectType } from "@nestjs/graphql";
import { Field } from "@nestjs/graphql/dist/decorators/field.decorator";
import User from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@ObjectType()
@Entity()
export default class UploadFile extends BaseEntity{
    constructor(pt: Partial<UploadFile>) {
        super();
        Object.assign(this, pt);
    }

    @Field(type => String)
    @PrimaryGeneratedColumn()
    fileId: number;

    @Field(type => String)
    @Column()
    filename : string;

    @Field(type => String)
    @Column()
    originalName : string;

    @ManyToOne( () => User, user => user.files)
    uploadedBy: User;

    @Field( type => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => String)
    @Column()
    serverLink: string;

    @Field(type => Int)
    @Column({type: "int"})
    sizeInBytes: number;

    @Field(type => String, {nullable: true})
    @Column({nullable: true})
    shortenedLink: string;

    @RelationId((file: UploadFile) => file.uploadedBy)
    @Field(type => Int)
    uploadedUserId : number;
}