import UploadFile from 'src/file/file.entity';
import User from 'src/user/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UtilModule } from './util/util.module';

@Module({
  imports: [ApiModule, UserModule, AuthModule, FileModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'huy221100',
      database: 'devprj1',
      entities: [User, UploadFile],
      logger: "debug",
      synchronize: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')}),
    UtilModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
