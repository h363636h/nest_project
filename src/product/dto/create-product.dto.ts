import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum } from 'class-validator';

enum ProductStatus {
  Y = 'Y',
  N = 'N',
}

export class CreateProductDto {
  @ApiProperty()
  p_uid: number;

  @ApiProperty()
  @IsString()
  p_name: string;

  @ApiProperty()
  @IsNumber()
  p_category: number;

  @ApiProperty()
  @IsNumber()
  p_price: number;

  @ApiProperty()
  @IsNumber()
  p_reserve: number;

  @ApiProperty()
  @IsNumber()
  p_point: number;

  @ApiProperty()
  @IsNumber()
  p_stock: number;

  @ApiProperty({ enum: ['Y', 'N'] })
  @IsEnum(ProductStatus)
  p_soldout: ProductStatus;

  @ApiProperty()
  @IsString()
  p_image: string;

  @ApiProperty({ enum: ['Y', 'N'] })
  @IsEnum(ProductStatus)
  p_status: ProductStatus;
}
