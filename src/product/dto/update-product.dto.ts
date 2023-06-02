import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsNumberString,
  IsObject,
} from 'class-validator';
import { YesOrNo } from '../../common/enum/common.enum';
import { UpdateProductCategoryDto } from 'src/product_category/dto/update-productCategory.dto';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  p_name?: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  p_category?: number;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  p_price?: number;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  p_reserve?: number;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  p_point?: number;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  p_stock?: number;

  @ApiProperty({ enum: YesOrNo })
  @IsEnum(YesOrNo)
  @IsOptional()
  p_soldout?: keyof typeof YesOrNo;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '파일',
  })
  @IsOptional()
  p_image?: string;

  @ApiProperty({ enum: YesOrNo })
  @IsEnum(YesOrNo)
  @IsOptional()
  p_status: keyof typeof YesOrNo;
}
