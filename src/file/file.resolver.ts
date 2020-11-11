import {
  UseGuards
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';
import { parseFragmentToInlineFragment } from 'graphql-tools';
import { FileUpload } from 'graphql-upload';
import { AuthGuard } from 'src/auth/auth.guard';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { editFileName } from 'src/util/editFileName.util';
import { FileCreateDto } from './file-create.dto';
import UploadFile from './file.entity';
import { FileService } from './file.service';
@Resolver(of => UploadFile)
export class FileResolver {
  constructor(
    private readonly fileService: FileService,
    private readonly userService: UserService,
  ) {}

  @Query(returns => [UploadFile])
  @UseGuards(AuthGuard)
  async findAllFile(@Context() { user }) {
    return await this.fileService.findAllFile(user.userId);
  }

  @Query(returns => UploadFile)
  async findFileById(@Args({name: "id", type: () => Int}) id: string) {
    return this.fileService.findById(id);
  }


  @ResolveProperty(returns => User)
  async uploadedBy(@Parent() parent: UploadFile) {
    const file = await this.fileService.findById(parent.fileId);
    return this.userService.findById(file.uploadedUserId);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard)
  async deleteById(@Args('id', {type: () => Int}) id: number,@Context() { user }) {
    return !!await (await this.fileService.delete(id)).affected;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Context() { user },
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      let fileSize = 0;
      const editedName = editFileName(filename);
      createReadStream()
        .on('data', (chunk) => fileSize+=chunk.length)
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', async (chunk) => {
          const payload: FileCreateDto = {
            sizeInBytes: fileSize,
            filename: editedName,
            originalName: filename,
            uploadUserId: user.userId,
            serverLink: `./uploads/${filename}`,
          };
          const retUser = await this.fileService.createFile(payload);
          resolve(retUser);
        })
        .on('error', () => reject(new Error('Error while uploading')));
    });
  }
}
