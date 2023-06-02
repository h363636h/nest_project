import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { POINT_PT_TYPE_ENUM } from 'src/database/entities/point.entity';
import { User } from 'src/database/entities/user.entity';
import { ManyToOne } from 'typeorm';

export class CreatePointDto {
  @ApiProperty({
    description: '포인트 지급 요청 타입',
    required: true,
    isArray: true,
    enum: POINT_PT_TYPE_ENUM,
    example: Object.keys(POINT_PT_TYPE_ENUM),
  })
  @IsNotEmpty()
  pt_type: string;

  @ApiProperty({
    example: '300',
    description: '지급할 포인트',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  pt_point: number;

  @ApiProperty({
    example: '회원 가입시 포인트 지급',
    description: '히스토리 내용',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  pt_comment: string;

  @ManyToOne(() => User)
  user: User;
}
