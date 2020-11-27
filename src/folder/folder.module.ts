import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature( [Folder] ), UserModule],
  providers: [FolderService, FolderResolver]
})
export class FolderModule {}
