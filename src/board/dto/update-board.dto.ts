import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Board } from 'src/database/entities/board.entity';
import { User } from 'src/database/entities/user.entity';
import { YesOrNo } from '../../common/enum/common.enum';

export class UpdateBoardDto {
  @ApiProperty({ description: '제목' })
  @IsString()
  private b_title: string;

  @ApiProperty({ description: '작성자 id' })
  @IsString()
  private b_writer: string;

  @ApiProperty({ description: '본문' })
  @IsString()
  private b_content: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '첨부 파일',
  })
  @IsOptional()
  private b_file: Express.Multer.File;

  @ApiPropertyOptional({ description: '잠금 비밀번호' })
  @IsOptional()
  @IsString()
  private b_passwd: string;

  @ApiProperty({
    enum: YesOrNo,
    default: YesOrNo.N,
    description: '잠금여부 (Y:잠금, N:공개)',
  })
  @IsEnum(YesOrNo)
  private b_is_lock: YesOrNo;

  @ApiProperty({
    enum: YesOrNo,
    default: YesOrNo.Y,
    description: '노출여부 (Y:노출, N:미노출)',
  })
  @IsEnum(YesOrNo)
  private b_is_view: YesOrNo;

  getB_writer() {
    return this.b_writer;
  }

  toBoardEntity(board: Board, user: User): Board {
    board.b_title = this.b_title;
    board.user = user;
    board.b_content = this.b_content;
    board.b_is_lock = this.b_is_lock;
    board.b_is_view = this.b_is_view;
    board.b_passwd = this.b_passwd;
    return board;
  }
}
