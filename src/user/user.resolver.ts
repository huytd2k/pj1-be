import { UserService } from './user.service';
import  User  from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import UserCreateDTO from './user-create.dto';
import { validate } from 'class-validator';
import { TokenHelper } from 'src/util/token.util';

@Injectable()
@Resolver(of => User)
export class UserResolver {
   constructor(
       private readonly userService: UserService
   ) {}
   
   @Query( returns => [User] ) 
   async getUsers()
   {
        return this.userService.findAll();
   }

   @Mutation( returns => String) 
   async register(@Args('createUserDto') payload: UserCreateDTO) 
   {
        validate(payload);
        await this.userService.create(payload);
        return TokenHelper.generateToken(payload, 3000);
   }
}