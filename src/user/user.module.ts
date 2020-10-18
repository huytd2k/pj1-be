import { UtilModule } from './../util/util.module';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppModule } from './../app.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import User from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}
