import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform : true,
    })
  )

    // ✴️추가 시작
 const config = new DocumentBuilder()
 .setTitle('Fruit API Documentation')
 .setDescription('과일 프로젝트의 API 문서입니다')
 .setVersion('1.0')
 .addTag('fruit')
 .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // ✴️추가 
  await app.listen(3000);
}
bootstrap();
