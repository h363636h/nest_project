import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-productCategroy.dto';
import { UpdateProductCategoryDto } from './dto/update-productCategory.dto';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from 'src/database/entities/productCategory.entity';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('ProductCategory API')
@Controller('product_category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post('/')
  @ApiOperation({
    summary: '상품 분류 등록',
    description: '상품 분류를 등록합니다.',
  })
  createProductCategory(
    @Body() createProductInput: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.create(createProductInput);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: '상품분류 수정',
    description: 'id 값으로 상품을 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '상품 분류 ID', type: 'number' })
  updateProductCategory(
    @Param('id') id: number,
    @Body() input: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.modify(id, input);
  }

  // 상품리스트 전체 호출
  @Get('/')
  @ApiOperation({
    summary: '상품 분류 전체 리스트 호출',
    description: '상품 분류 전체 리스트를 가져옵니다.',
  })
  getProductCategoryAll() {
    return this.productCategoryService.findAll();
  }

  // 상품리스트 1개 호출
  @Get('/:id')
  @ApiOperation({
    summary: '하나의 상품 분류 호출',
    description: 'id 값으로 상품 분류를 가져옵니다.',
  })
  getProductCategory(@Param('id') id: number) {
    return this.productCategoryService.findOne(id);
  }

  // 상품리스트 삭제
  @Delete('/:id')
  @ApiOperation({
    summary: '하나의 상품 분류 삭제',
    description: 'id 값으로 상품 분류 삭제합니다.',
  })
  deleteProductCategory(@Param('id') id: number) {
    return this.productCategoryService.delete(id);
  }
}
