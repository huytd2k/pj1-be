import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import User from 'src/user/user.entity';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';
import { FolderCreateDTO } from './models/folder-create.dto';

@Resolver(of => Folder)
export class FolderResolver {
    constructor(private readonly folderService: FolderService) {};


    @Mutation(returns => Folder)
    @UseGuards(AuthGuard)
    async createFolder(@Args('createFolderDTO') payload: FolderCreateDTO, @Context() {user}) : Promise<Folder> {
        payload.uploadUserId = user.userId;
        return this.folderService.createFolder(payload);
    } 


    @Query(returns => [Folder])
    @UseGuards(AuthGuard)
    async findFolders( @Context() {user} : {user: User}) {
        console.log(user);
        return await this.folderService.findByPartial({ uploadByUserId: user.userId, isRootFolder: true});
    }


}
