import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ArgumentOutOfRangeError } from 'rxjs';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';
import { ValidateModule } from './validate/validate.module';
import * as redis from "redis";
import * as connectRedis from "connect-redis"
import * as session from 'express-session';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import 'reflect-metadata'
const redisClient = redis.createClient({
  host: 'localhost',
  no_ready_check: true,
  auth_pass: 'sOmE_sEcUrE_pAsS'
});
const redisStore = connectRedis(session);

redisClient.on('error', (err) => console.log(err));
redisClient.on('connect', () => console.log("Connected to redis!"))


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({secret: 'sOmE_sEcUrE_pAsS',
  name: '_redisSession',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 86400
  })
  }))
  app.enableCors();


  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalFilters(new HttpExceptionFilter());

  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  const options = new DocumentBuilder().setTitle('Project I - Filesharing - Backend').setDescription("API Document for my PJ1 back-end").setVersion("0.1").build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app , document);
  await app.listen(3000);
}
bootstrap();
