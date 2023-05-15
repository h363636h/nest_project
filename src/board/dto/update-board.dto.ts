import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { YesOrNo } from '../enum/board.enum';

export class UpdateBoardDto {
  @ApiProperty()
  b_sub_id: number;

  @ApiProperty()
  @IsString()
  b_title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  b_writer: string;

  @ApiProperty()
  @IsString()
  b_content: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '파일',
  })
  @IsOptional()
  b_file: Express.Multer.File;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  b_passwd: string;

  @ApiProperty({ enum: ['Y', 'N'] })
  @IsEnum(YesOrNo)
  b_is_lock: YesOrNo;

  @ApiProperty({ enum: ['Y', 'N'] })
  @IsEnum(YesOrNo)
  b_is_view: YesOrNo;
}
