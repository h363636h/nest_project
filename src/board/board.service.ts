import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/database/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import * as fs from 'fs';
import { ViewBoardDto } from './dto/view-board.dto';
import { User } from 'src/database/entities/user.entity';
import { BoardFile } from 'src/database/entities/board_file.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(BoardFile)
    private bfRepository: Repository<BoardFile>,
  ) {}

  async getBoardAll(page: number): Promise<ViewBoardDto[]> {
    const pageSize = 10;
    if (page < 1) {
      page = 1;
    }
    const boards = await this.boardRepository
      .createQueryBuilder('board')
      .select(['row_number() over(order by b_id desc) as b_no', 'board.*'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();
    if (!boards) {
      throw new NotFoundException(`can't find`);
    }
    const boardDtos = [];
    boards.forEach((board) => {
      boardDtos.push(ViewBoardDto.fromViewBoardDto(board));
    });

    return boardDtos;
  }

  async getBoardOne(id: number): Promise<ViewBoardDto> {
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .select('board.*')
      .where('board.b_id = :id', { id: id })
      .getRawOne();
    if (!board) {
      throw new NotFoundException(`can't find id: ${id}`);
    }
    console.log(board);
    return ViewBoardDto.fromViewBoardDto(board);
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    files: Express.Multer.File[],
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.u_id = :id', { id: createBoardDto.getB_writer() })
      .getOne();
    if (!user) {
      throw new NotFoundException(
        `can't find user id: ${createBoardDto.getB_writer()}`,
      );
    }
    const board = createBoardDto.toBoardEntity(user);
    const res_board = await this.boardRepository.save(board);
    files.forEach((file) => {
      if (file != null) {
        console.log(board);
        const bf = BoardFile.fromBoardFileEntity(
          file.filename,
          file.path,
          res_board,
        );
        this.bfRepository.save(bf);
      }
    });
    return await this.boardRepository.save(board);
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    file: Express.Multer.File,
  ) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.u_id = :id', { id: updateBoardDto.getB_writer() })
      .getOne();
    if (!user) {
      throw new NotFoundException(
        `can't find user id: ${updateBoardDto.getB_writer()}`,
      );
    }
    let board = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.b_id = :id', { id: id })
      .getOne();
    if (!board) {
      throw new NotFoundException(`can't find board id: ${id}`);
    }
    board = updateBoardDto.toBoardEntity(board, user);
    if (fs.existsSync(board.b_file_url)) {
      fs.unlinkSync(board.b_file_url);
    }
    if (file != null) {
      board.b_file_url = file.path;
    }
    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: number) {
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.b_id = :id', { id: id })
      .getOne();
    if (!board) {
      throw new NotFoundException(`can't find board id: ${id}`);
    }
    const bf_file_url = board.b_file_url;
    if (fs.existsSync(bf_file_url)) {
      fs.unlinkSync(bf_file_url);
    }
    return await this.boardRepository.delete(id);
  }
}
