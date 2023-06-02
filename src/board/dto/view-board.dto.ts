import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Board } from 'src/database/entities/board.entity';

export class ViewBoardDto {
  @ApiProperty()
  @IsString()
  private b_no: string;

  @ApiProperty()
  @IsString()
  private b_id: number;

  @ApiProperty()
  @IsString()
  private b_title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  private b_writer: string;

  @ApiProperty()
  @IsString()
  private b_content: string;

  static fromViewBoardDto(board: any): ViewBoardDto {
    const boardDto = new ViewBoardDto();
    boardDto.b_no = board.b_no;
    boardDto.b_id = board.b_id;
    boardDto.b_title = board.b_title;
    boardDto.b_content = board.b_content;
    boardDto.b_writer = board.b_writer;
    return boardDto;
  }
}
