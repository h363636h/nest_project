import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateProductCategoryDto {
  pc_uid: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pc_name?: string;
}
