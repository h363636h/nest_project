import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/database/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('swagger')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  createProduct(
    @Body() createProductInput: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() input: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.modify(id, input);
  }
  // 리스트 전체 호출
  @Get('/')
  getProductAll() {
    return this.productService.findAll();
  }

  // 상품 1개 호출
  @Get('/:id')
  getProduct(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // 상품삭제
  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
