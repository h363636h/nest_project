import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ViewCommnetDto } from './dto/view-commnet.dto';

@ApiTags('Comment API')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '해당 id의 게시판 댓글 리스트 조회' })
  @ApiParam({ name: 'b_id', description: '게시글 번호' })
  @Get('/board/:b_id/comment')
  async getCommentAll(
    @Param('b_id', ParseIntPipe) b_id: number,
  ): Promise<ViewCommnetDto[]> {
    return await this.commentService.getCommentAllByBoardId(b_id);
  }

  @ApiOperation({ summary: '해당 id의 게시판 댓글 등록' })
  @ApiResponse({ status: 201, description: '등록 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @ApiParam({ name: 'b_id', description: '게시글 번호' })
  @ApiBody({ type: CreateCommentDto, description: 'CreateCommentDto 객체' })
  @Post('/board/:b_id/comment')
  async createComment(
    @Param('b_id', ParseIntPipe) b_id: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.createComment(b_id, createCommentDto);
  }

  @ApiOperation({ summary: '댓글 수정' })
  @ApiResponse({ status: 200, description: '수정 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @ApiParam({ name: 'id', description: '댓글 번호' })
  @ApiBody({ type: UpdateCommentDto, description: 'UpdateCommentDto 객체' })
  @Patch('/comment/:id')
  async updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const res = await this.commentService.updateComment(id, updateCommentDto);
    if (res == null) {
      return { status: false, msg: '수정 실패' };
    } else {
      return { status: true, msg: '수정 성공' };
    }
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  @ApiResponse({ status: 500, description: '서버 에러' })
  @ApiParam({ name: 'id', description: '댓글 번호' })
  @Delete('/comment/:id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    const res = await this.commentService.deleteComment(id);
    if (res == null) {
      return { status: false, msg: '삭제 실패' };
    } else {
      return { status: true, msg: '삭제 성공' };
    }
  }
}
