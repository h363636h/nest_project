import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumberString, IsObject } from 'class-validator';
import { YesOrNo } from '../../common/enum/common.enum';
import { CreateProductCategoryDto } from 'src/product_category/dto/create-productCategroy.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  p_name: string;

  @ApiProperty()
  @IsNumberString()
  p_category: number;

  @ApiProperty()
  @IsNumberString()
  p_price: number;

  @ApiProperty()
  @IsNumberString()
  p_reserve: number;

  @ApiProperty()
  @IsNumberString()
  p_point: number;

  @ApiProperty()
  @IsNumberString()
  p_stock: number;

  @ApiProperty({ enum: YesOrNo })
  @IsEnum(YesOrNo)
  p_soldout: keyof typeof YesOrNo;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: '파일',
  })
  p_image: any;

  @ApiProperty({ enum: YesOrNo })
  @IsEnum(YesOrNo)
  p_status: keyof typeof YesOrNo;
}
