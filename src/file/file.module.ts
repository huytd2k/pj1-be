import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import UploadFile from './file.entity';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User, UploadFile]),
    MulterModule.register({
      dest: './uploads',
    }),
 ],
  providers: [FileResolver, FileService],
  controllers: [FileController],
})
export class FileModule {}
