import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { FolderCreateDTO } from './models/folder-create.dto';

@Injectable()
export class FolderService extends BaseService<Folder, Repository<Folder>> {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepositort: Repository<Folder>,
    private readonly userService: UserService,
  ) {
    super(folderRepositort);
  }

  async createFolder(payload: FolderCreateDTO) {
    const newFolder = new Folder({...payload, isRootFolder: true});
    const res = await this.create(newFolder);
    if(payload.parentFolderId) {
      newFolder.isRootFolder = false;
      const parentFolder = await this.findById(payload.parentFolderId, ["childFolders"]);
      parentFolder.childFolders.push(newFolder);
      await this.update(payload.parentFolderId, parentFolder);
    }
    const user = await this.userService.findById(payload.uploadUserId, ["folders"]);
    user.folders.push(newFolder);
    await this.userService.update(user.userId, user);
    return res 
  }
}
