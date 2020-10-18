import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import UploadFile from './file.entity';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, UploadFile])],
  providers: [FileResolver, FileService]
})
export class FileModule {
}
