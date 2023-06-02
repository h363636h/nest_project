import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Comment } from 'src/database/entities/comment.entity';
import { User } from 'src/database/entities/user.entity';
import { YesOrNo } from '../../common/enum/common.enum';

export class UpdateCommentDto {
  @ApiPropertyOptional({ description: '작성자 id' })
  @IsOptional()
  @IsString()
  private c_writer: string;

  @ApiProperty({ description: '내용' })
  @IsString()
  private c_content: string;

  @ApiProperty({
    enum: YesOrNo,
    default: YesOrNo.Y,
    description: '노출여부 (Y:노출, N:미노출)',
  })
  @IsEnum(YesOrNo)
  private c_is_view: YesOrNo;

  getC_writer() {
    return this.c_writer;
  }

  toCommentEntity(comment: Comment, user: User): Comment {
    comment.user = user;
    comment.c_content = this.c_content;
    comment.c_is_view = this.c_is_view;
    return comment;
  }
}
