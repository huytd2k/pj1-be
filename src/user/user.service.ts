import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { EncryptHelper } from 'src/util/encrypt.util';
import { Repository } from 'typeorm';
import UserCreateDTO from './user-create.dto';
import User from './user.entity';

@Injectable()
export class UserService extends BaseService<User, Repository<User> >{

    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>
    ) { 
        super(userRepository);
    }


    async create(payload : UserCreateDTO) {
        const existedUser = await this.userRepository.findOne({username: payload.username});
        if(existedUser) throw new HttpException("Existed User !", HttpStatus.BAD_REQUEST);
        const user = new User({...payload, password: await EncryptHelper.hash(payload.password)});
        return await this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find({relations: ['files']});
    }
    async findByUserId(userId: number) {
       return await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.files', 'file').where("user.userId = :id", {id: userId}).getOne();
    }

    async findByUsername(username: string) {
        return await this.userRepository.findOne({username: username});
    }

    async findByFileId(fileId: number) {
       return await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.files', 'file').where("file.fileId = :id", {id: fileId}).getOne();
    }
}
