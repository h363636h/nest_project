import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { Board } from '../database/entities/board.entity';
import { BoardService } from './board.service';
import { MulterModule } from '@nestjs/platform-express';
import { multiOpt } from '../common/fileConfig/fileUploadConfig';
import { User } from 'src/database/entities/user.entity';
import { BoardFile } from 'src/database/entities/board_file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User, BoardFile]),
    MulterModule.register(multiOpt),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
