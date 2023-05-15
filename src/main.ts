import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const swagger_config = new DocumentBuilder()
    .setTitle('Rand Mall')
    .setDescription('Rand Mall API Documents')
    .setVersion('1.0.0')
    .addTag('Rand Mall')
    .build();
  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, swagger_config);
  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
