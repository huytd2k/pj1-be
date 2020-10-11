import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().setTitle('Project I - Filesharing - Backend').setDescription("API Document for my PJ1 back-end").setVersion("0.1").build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app , document);
  await app.listen(3000);
}
bootstrap();
