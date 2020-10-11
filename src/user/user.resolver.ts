import { UserService } from './user.service';
import  User  from 'src/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import UserCreateDTO from './user-create.dto';

@Injectable()
@Resolver(of => User)
export class UserResolver {
   constructor(
       private readonly userService: UserService
   ) {}
   
   @Query( returns => [User] ) 
   async users()
   {
        return this.userService.findAll();
   }

   @Mutation( returns => User) 
   async register(@Args('createUserDto') payload: UserCreateDTO) 
   {
    return await this.userService.create(payload);
   }
}