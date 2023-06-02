import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ViewBoardDto } from './dto/view-board.dto';

@ApiTags('Board API')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시글 리스트 조회' })
  @ApiQuery({ name: 'page', description: '페이지 번호' })
  @Get('/')
  async getBoardAll(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<ViewBoardDto[]> {
    return await this.boardService.getBoardAll(page);
  }

  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiParam({ name: 'id', description: '게시글 번호' })
  @Get('/:id')
  async getBoardOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ViewBoardDto> {
    return await this.boardService.getBoardOne(id);
  }

  @ApiOperation({ summary: '게시글 등록' })
  @ApiResponse({ status: 201, description: '등록 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @ApiBody({ type: CreateBoardDto, description: 'CreateBoardDto 객체' })
  @ApiConsumes('multipart/form-data')
  @Post('/')
  @UseInterceptors(FilesInterceptor('b_file'))
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(files);
    return await this.boardService.createBoard(createBoardDto, files);
  }

  @ApiOperation({ summary: '게시글 수정' })
  @ApiResponse({ status: 200, description: '수정 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @ApiParam({ name: 'id', description: '게시글 번호' })
  @ApiBody({ type: UpdateBoardDto, description: 'UpdateBoardDto 객체' })
  @ApiConsumes('multipart/form-data')
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('b_file'))
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.boardService.updateBoard(id, updateBoardDto, file);
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @ApiParam({ name: 'id', description: '게시글 번호' })
  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return await this.boardService.deleteBoard(id);
  }
}
