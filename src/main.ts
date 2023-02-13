import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefix
  app.setGlobalPrefix(process.env.PREFIX);

  // Version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.VERSION,
  });

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('create-nestjs-project')
    .setDescription('create-nestjs-project')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc/swagger-api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
