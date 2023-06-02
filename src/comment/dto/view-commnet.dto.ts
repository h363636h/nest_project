import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Comment } from 'src/database/entities/comment.entity';

export class ViewCommnetDto {
  @ApiProperty()
  @IsString()
  private c_no: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  private c_writer: string;

  @ApiProperty()
  @IsString()
  private c_content: string;

  static fromViewCommentDto(commnet: any): ViewCommnetDto {
    const commnetDto = new ViewCommnetDto();
    commnetDto.c_content = commnet.c_content;
    commnetDto.c_writer = commnet.c_writer;
    return commnetDto;
  }
}
