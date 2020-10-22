import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import User from 'src/user/user.entity';
import { FileCreateDto } from './file-create.dto';
import UploadFile from './file.entity';
import { FileService } from './file.service';

@Resolver()
export class FileResolver {
    constructor(private readonly fileService: FileService) {}

    @Query( returns => [UploadFile])
    async findAllFile(@Args('userId', {type: () => Int}) userId: number) {
        return await this.fileService.findAllFile(userId);
    }
    @Mutation( returns => User)
    @UseGuards(AuthGuard)
    async createFile(@Args('fileCreate') payload: FileCreateDto, @Context() {user}) {
        if(payload.uploadUserId != user.userId) throw new HttpException("Forbidden !", HttpStatus.FORBIDDEN)
       return await this.fileService.createFile(payload); 
    }
}
