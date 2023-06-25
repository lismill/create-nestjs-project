import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Static
  app.useStaticAssets('public');

  // Prefix
  app.setGlobalPrefix(process.env.PREFIX);

  // Version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.VERSION,
  });

  // transform.interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // http-exception.filter
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('create-nestjs-project')
    .setDescription('create-nestjs-project')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
