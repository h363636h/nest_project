import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/database/entities/board.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ViewCommnetDto } from './dto/view-commnet.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getCommentAllByBoardId(b_id: number) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .select(['*'])
      .where('comment.c_b_id = :id', { id: b_id })
      .getRawMany();
    if (!comments) {
      throw new NotFoundException(`can't find`);
    }
    let commentDtos = [];
    comments.forEach((comment) => {
      commentDtos.push(ViewCommnetDto.fromViewCommentDto(comment));
    });
    return commentDtos;
  }

  async createComment(b_id: number, createCommentDto: CreateCommentDto) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.u_id = :id', { id: createCommentDto.getC_writer() })
      .getOne();
    if (!user) {
      throw new NotFoundException(
        `can't find user id: ${createCommentDto.getC_writer()}`,
      );
    }
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.b_id = :id', { id: b_id })
      .getOne();
    if (!board) {
      throw new NotFoundException(`can't find board id: ${b_id}`);
    }
    const comment = createCommentDto.toCommentEntity(board, user);
    return await this.commentRepository.save(comment);
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.u_id = :id', { id: updateCommentDto.getC_writer() })
      .getOne();
    if (!user) {
      throw new NotFoundException(
        `can't find user id: ${updateCommentDto.getC_writer()}`,
      );
    }
    let comment = await this.commentRepository.findOne({ where: { c_id: id } });
    if (!comment) {
      throw new NotFoundException(`can't find id ${id}`);
    }
    comment = updateCommentDto.toCommentEntity(comment, user);
    return await this.commentRepository.save(comment);
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { c_id: id },
    });
    if (!comment) {
      throw new NotFoundException(`can't find id ${id}`);
    }
    return await this.commentRepository.delete(id);
  }
}
