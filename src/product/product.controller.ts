import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/database/entities/product.entity';
import { ApiTags, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Product API')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('p_image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '상품 등록', description: '상품을 등록합니다.' })
  createProduct(
    @Body() createProductInput: CreateProductDto,
    @UploadedFiles() file: Express.Multer.File,
  ): Promise<Product> {
    //createProductInput.p_image = file.map((file) => file.path); // 여러 개의 파일의 경로를 배열로 저장합니다.
    createProductInput.p_image = file.path;
    return this.productService.create(createProductInput);
  }

  @Patch('/:id')
  @UseInterceptors(FilesInterceptor('p_image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '상품 수정',
    description: 'p_id 값으로 상품을 수정합니다.',
  })
  @ApiParam({ name: 'id', description: '상품 ID', type: 'number' })
  updateProduct(
    @Param('id') p_uid: number,
    @Body() updateProductInput: UpdateProductDto,
    @UploadedFiles() file: Express.Multer.File,
  ): Promise<Product> {
    updateProductInput.p_image = file.path;
    return this.productService.modify(p_uid, updateProductInput);
  }

  // 리스트 전체 호출
  @Get('/')
  @ApiOperation({
    summary: '상품 전체 리스트 호출',
    description: '상품 전체 리스트를 가져옵니다.',
  })
  getProductAll() {
    return this.productService.findAll();
  }

  // 상품 1개 호출
  @Get('/:id')
  @ApiOperation({
    summary: '하나의 상품 호출',
    description: 'p_uid 값으로 상품을 가져옵니다.',
  })
  getProduct(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // 상품삭제
  @Delete('/:id')
  @ApiOperation({
    summary: '하나의 상품 삭제',
    description: 'p_uid 값으로 상품을 삭제합니다.',
  })
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
