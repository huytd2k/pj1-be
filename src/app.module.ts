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
import { BaseService } from 'src/base.service';
import { ValidateModule } from './validate/validate.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule} from '@nestjs/serve-static'
@Module({
  imports: [ApiModule, UserModule, AuthModule, FileModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'mike',
      password: 'huy221100',
      database: 'project1',
      entities: [User, UploadFile],
      logger: "debug",
      logging: true,
      synchronize: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({req}) => ( {headers:  req.headers }),
      uploads: {
        maxFieldSize: Infinity,
        maxFiles: 10
      }
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UtilModule,
    ValidateModule,
  ],
  controllers: [AppController],
  providers: [AppService, BaseService],
})
export class AppModule { }
