
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "src/user/user.entity";
import { Field } from "@nestjs/graphql/dist/decorators/field.decorator";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export default class UploadFile {
    constructor(pt: Partial<UploadFile>) {
        Object.assign(this, pt)
    }

    @Field(type => String)
    @PrimaryGeneratedColumn()
    fileId: number;

    @Field(type => String)
    @Column()
    filename : string;

    @Field(type => [User])
    @ManyToOne( () => User, user => user.files)
    uploadedBy: User;

    @Field( type => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(type => String)
    @Column()
    serverLink: string;

    @Field(type => String)
    @Column({nullable: true})
    shortenedLink: string;
}