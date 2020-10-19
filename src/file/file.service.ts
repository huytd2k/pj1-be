import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { FileCreateDto } from './file-create.dto';
import UploadFile from './file.entity';

@Injectable()
export class FileService {

    constructor(
        private readonly userService: UserService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(UploadFile) private readonly fileRepository: Repository<UploadFile>
    ) { }

    async createFile(payload: FileCreateDto) {
        try {
            const foundUser = await this.userService.findByUserId( payload.uploadUserId );
            const newFile = new UploadFile({...payload});
            foundUser.files.push(newFile);
            await this.userRepository.update({userId: foundUser.userId}, foundUser);
        } catch {
            throw new HttpException("Bad request !", HttpStatus.BAD_REQUEST)
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
