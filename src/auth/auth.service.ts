import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import User from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { EncryptHelper } from 'src/util/encrypt.util';

@Injectable()
export class AuthService {
    constructor( private readonly userService : UserService) {}
    async validateUser(username: string, password: string) {
        const foundUser = await this.userService.findByUsername(username);
        if (foundUser && EncryptHelper.compare(password, foundUser.password)) {
            return foundUser;
        } else {
            throw new HttpException("Login failed", HttpStatus.BAD_REQUEST);
        }
    }

}
