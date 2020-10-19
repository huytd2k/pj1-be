import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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
    async createFile(@Args('fileCreate') payload: FileCreateDto) {
       return await this.fileService.createFile(payload); 
    }
}
