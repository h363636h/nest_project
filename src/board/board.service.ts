import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/database/entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import * as fs from 'fs';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getBoardAll(): Promise<Board[]> {
    const found = await this.boardRepository.find();

    if (!found) {
      throw new NotFoundException(`can't find`);
    }
    return found;
  }

  async getBoardOne(id: number): Promise<Board> {
    console.log(id);
    const found = await this.boardRepository.findOne({ where: { b_id: id } });

    if (!found) {
      throw new NotFoundException(`can't find id ${id}`);
    }
    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    file: Express.Multer.File,
  ): Promise<Board> {
    const board = new Board();
    board.b_sub_id = createBoardDto.b_sub_id;
    board.b_title = createBoardDto.b_title;
    board.b_writer = createBoardDto.b_writer;
    board.b_content = createBoardDto.b_content;
    board.b_is_lock = createBoardDto.b_is_lock;
    board.b_is_view = createBoardDto.b_is_view;
    board.b_passwd = createBoardDto.b_passwd;
    if (file != null) {
      board.b_file_url = file.path;
    }
    return this.boardRepository.save(board);
  }

  async deleteBoard(id: number): Promise<void> {
    const res = await this.boardRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException(`cant find board with id ${id}`);
    }
    console.log(res);
  }

  async updateBoard(
    id: number,
    updateDto: UpdateBoardDto,
    file: Express.Multer.File,
  ): Promise<Board> {
    const board = await this.getBoardOne(id);
    board.b_title = updateDto.b_title;
    board.b_content = updateDto.b_content;
    board.b_is_lock = updateDto.b_is_lock;
    board.b_is_view = updateDto.b_is_view;
    board.b_passwd = updateDto.b_passwd;

    const bf_file_url = board.b_file_url;
    if (fs.existsSync(bf_file_url)) {
      fs.unlinkSync(bf_file_url);
    }
    if (file != null) {
      board.b_file_url = file.path;
    }

    await this.boardRepository.save(board);
    return board;
  }
}
