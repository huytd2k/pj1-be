import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptHelper } from 'src/util/encrypt.util';
import { Repository } from 'typeorm';
import UserCreateDTO from './user-create.dto';
import User from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository : Repository<User>
    ) { }


    async create(payload : UserCreateDTO) {
        const existedUser = await this.userRepository.findOne({username: payload.username});
        if(existedUser) throw new HttpException("Existed User !", HttpStatus.BAD_REQUEST);
        const user = new User({...payload, password: await EncryptHelper.hash(payload.password)});
        return await this.userRepository.save(user);
    }

    async findAll() {
        return await this.userRepository.find();
    }
}
