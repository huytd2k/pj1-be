import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import UploadFile from "src/file/file.entity";
import { ObjectType } from "@nestjs/graphql/dist/decorators/object-type.decorator";
import { Int } from "@nestjs/graphql/dist/scalars";
import { Field } from "@nestjs/graphql/dist/decorators/field.decorator";
import { EncryptHelper } from "src/util/encrypt.util";

@Entity()
@ObjectType()
export default class User {

    constructor(ptuser: Partial<User>) {
        Object.assign(this, ptuser)
    }

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    userId: number;

    @Column()
    @Field(type => String)
    username : string;

    @Column()
    @Field(type => String)
    password: string;

    // @Field(type => [UploadFile])
    @OneToMany(() => UploadFile, file => file.uploadedBy)
    files: File[];

}