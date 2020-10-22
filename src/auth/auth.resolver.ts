import { UseGuards } from '@nestjs/common';
import { Args, Context, InputType, Mutation, Query, Resolver } from '@nestjs/graphql';
import { stringify } from 'querystring';
import User from 'src/user/user.entity';
import { TokenHelper } from 'src/util/token.util';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './user-login.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(returns => String)
    async login(@Args('userLogin') loginPayload : UserLoginDTO) {
        const {username, password} = loginPayload
        const userId = await (await this.authService.validateUser(username, password)).userId;
        return TokenHelper.generateToken(loginPayload, 3600);
    }

    @UseGuards(AuthGuard)
    @Query( returns => User )
    me(@Context() {user}) {
        return user;
    }
}
