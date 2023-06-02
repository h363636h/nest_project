import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/database/entities/board.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { User } from 'src/database/entities/user.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board, User])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
