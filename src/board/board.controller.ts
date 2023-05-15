import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Board } from 'src/database/entities/board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardservice: BoardService) {}

  @Get('/')
  async getBoardAll(): Promise<Board[]> {
    return await this.boardservice.getBoardAll();
  }

  @Get('/:id')
  async getBoardOne(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    console.log(id);
    return await this.boardservice.getBoardOne(id);
  }

  @Post('/')
  @UseInterceptors(FileInterceptor('b_file'))
  @ApiConsumes('multipart/form-data')
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Board> {
    return await this.boardservice.createBoard(createBoardDto, file);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('b_file'))
  @ApiConsumes('multipart/form-data')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Board> {
    return await this.boardservice.updateBoard(id, updateBoardDto, file);
  }
  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.boardservice.deleteBoard(id);
  }
}
