import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
 import { Observable } from 'rxjs';
import {Request } from 'express'
import { TokenHelper } from 'src/util/token.util';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) return false;
    const jwtPayload = await this.validateToken(ctx.headers.authorization);
    ctx.user = await this.userService.findByUsername(( jwtPayload as any ).username);
    return true;
  }
  async validateToken(auth: string) {
    if(auth.split(' ')[0] !== "Bearer") {
      throw new HttpException("Invalid Token!", HttpStatus.FORBIDDEN);
    } 
    const jwtToken = auth.split(' ')[1];
    try {
      const payload =  await TokenHelper.verifyToken(jwtToken);
      return payload;
    } catch(err) {
      throw new HttpException("Invalid Token!", HttpStatus.FORBIDDEN);
    }
  }
}
