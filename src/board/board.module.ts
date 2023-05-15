import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { Board } from '../database/entities/board.entity';
import { BoardService } from './board.service';
import { MulterModule } from '@nestjs/platform-express';
import { multiOpt } from './fileUploadConfig';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), MulterModule.register(multiOpt)],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
