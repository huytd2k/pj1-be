import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ArgumentOutOfRangeError } from 'rxjs';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';
import { ValidateModule } from './validate/validate.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), {fallbackOnErrors: true});
  const options = new DocumentBuilder().setTitle('Project I - Filesharing - Backend').setDescription("API Document for my PJ1 back-end").setVersion("0.1").build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app , document);
  await app.listen(3000);
}
bootstrap();
