import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";
import UploadFile from "src/file/file.entity";
import { ObjectType } from "@nestjs/graphql/dist/decorators/object-type.decorator";
import { Int } from "@nestjs/graphql/dist/scalars";
import { Field } from "@nestjs/graphql/dist/decorators/field.decorator";
import { EncryptHelper } from "src/util/encrypt.util";

@Entity()
@ObjectType()
export default class User extends BaseEntity{

    constructor(ptuser: Partial<User>) {
        super();
        Object.assign(this, ptuser)
    }

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    userId: number;

    @Column()
    @Field(type => String)
    username : string;

    @Column()
    password: string;

    @Field(type => [UploadFile])
    @OneToMany(() => UploadFile, file => file.uploadedBy, {
        onDelete: 'CASCADE' 
    })
    files: UploadFile[];

}