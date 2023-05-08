import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FruitModule } from './fruit/fruit.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [FruitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

