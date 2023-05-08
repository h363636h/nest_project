import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FruitModule } from './fruit/fruit.module';

@Module({
  imports: [FruitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
