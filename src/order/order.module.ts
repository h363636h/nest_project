import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { order } from 'src/database/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([order])],
  providers: [OrderService],
  controllers: [OrderController]
})

export class OrderModule {}

