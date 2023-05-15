import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsEnum } from 'class-validator';

enum ProductStatus {
  Y = 'Y',
  N = 'N',
}

export class UpdateProductDto {
  p_uid: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  p_name?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  p_category?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  p_price?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  p_reserve?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  p_point?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  p_stock?: number;

  @ApiProperty({ enum: ['Y', 'N'] })
  @IsEnum(ProductStatus)
  @IsOptional()
  p_soldout: ProductStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  p_image?: string;

  @ApiProperty({ enum: ['Y', 'N'] })
  @IsEnum(ProductStatus)
  @IsOptional()
  p_status: ProductStatus;
}
