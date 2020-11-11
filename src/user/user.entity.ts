import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import { Int } from '@nestjs/graphql/dist/scalars';
import UploadFile from 'src/file/file.entity';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,

    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
@ObjectType()
export default class User extends BaseEntity {
  constructor(ptuser: Partial<User>) {
    super();
    Object.assign(this, ptuser);
  }

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  userId: number;

  @Column()
  @Field(type => String)
  username: string;

  @Column()
  password: string;

  @Field(type => [UploadFile], { nullable: true })
  @OneToMany(
    () => UploadFile,
    file => file.uploadedBy,
    {
      onDelete: 'CASCADE',
    },
  )
  files: UploadFile[];
}
