import { Field, Int, ObjectType } from "@nestjs/graphql";
import UploadFile from "src/file/file.entity";
import User from "src/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";


@ObjectType()
@Entity({name: 'folder'})
export class Folder extends BaseEntity{
    constructor(pt: Partial<Folder>) {
        super();
        Object.assign(this, pt);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(_type => Int)
    @PrimaryGeneratedColumn()
    id: number;
   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Field(_type => String)
    @Column()
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany( _to => Folder, folder => folder.parentFolder) 
    childFolders: Folder[];

    @Field( type => Boolean)
    @Column()
    isRootFolder: boolean;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne( _to => Folder, folders => folders.childFiles)
    parentFolder: Folder[];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany( _to => Folder, folder => folder.parentFolder) 
    childFiles: UploadFile[]

    @ManyToOne( _to => User, user => user.folders) 
    uploadedBy: User;

    @RelationId( (folder: Folder) => folder.uploadedBy )
    @Column()
    uploadByUserId : number;

    @CreateDateColumn()
    createdAt: Date;
}