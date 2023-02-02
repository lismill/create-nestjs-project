import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('create-nestjs-project')
    .setDescription('create-nestjs-project')
    .setTermsOfService('https://docs.nestjs.cn/8/introduction')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc/swagger-api', app, document);

  await app.listen(3789);
}
bootstrap();
