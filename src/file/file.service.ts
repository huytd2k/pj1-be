import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { BaseEntity, Repository } from 'typeorm';
import { FileCreateDto } from './file-create.dto';
import UploadFile from './file.entity';

@Injectable()
export class FileService extends BaseService<UploadFile, Repository<UploadFile>> {

    constructor(
        private readonly userService: UserService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(UploadFile) private readonly fileRepository: Repository<UploadFile>
    ) { 
        super(fileRepository);
    }

    async createFile(payload: FileCreateDto) {
        try {
            const foundUser = await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.files', 'file').where("user.userId = :id", {id: payload.uploadUserId}).getOne();
            const newFile = new UploadFile({...payload});
            await this.fileRepository.save(newFile);
            foundUser.files.push(newFile);
            await this.userRepository.save(foundUser);
            return foundUser;
        } catch(err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }

    }
    async findAllFile(userId: number) {
        try {
            const foundUser = await this.userService.findByUserId(userId);
            return foundUser.files;
        } catch {
            throw new HttpException("Bad request !", HttpStatus.BAD_REQUEST)
        }

    }
}
