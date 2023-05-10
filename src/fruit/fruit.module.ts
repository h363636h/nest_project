import { Module } from '@nestjs/common';
import { FruitController } from './fruit.controller';
import { FruitService } from './fruit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from '../database/entities/fruit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fruit])], 
  controllers: [FruitController],
  providers: [FruitService]
})
export class FruitModule {}
