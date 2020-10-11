
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import User from "src/user/user.entity";
import { Field } from "@nestjs/graphql/dist/decorators/field.decorator";

@Entity()
export default class UploadFile {
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

    @Field(type => [String])
    @Column()
    serverLink: string;
}