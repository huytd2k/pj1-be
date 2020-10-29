import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { AuthGuard } from 'src/auth/auth.guard';
import User from 'src/user/user.entity';
import { FileCreateDto } from './file-create.dto';
import UploadFile from './file.entity';
import { FileService } from './file.service';
import { FileUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';
import { editFileName } from 'src/util/editFileName.util';
@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(returns => [UploadFile])
  async findAllFile(@Args('userId', { type: () => Int }) userId: number) {
    return await this.fileService.findAllFile(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Context() { user },
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      filename = editFileName(filename);
      const payload: FileCreateDto = {
        filename,
        uploadUserId: user.userId,
        serverLink: `./uploads/${filename}`,
      };
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', async () => {
          const retUser = await this.fileService.createFile(payload);
          resolve(retUser);
        })
        .on('error', () => reject(new Error('Error while uploading')));
    });
  }

}
