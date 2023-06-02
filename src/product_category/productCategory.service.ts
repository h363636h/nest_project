import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-productCategroy.dto';
import { UpdateProductCategoryDto } from './dto/update-productCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from 'src/database/entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productRepository: Repository<ProductCategory>,
  ) {}

  // 상품카테고리 등록
  async create(input: CreateProductCategoryDto): Promise<ProductCategory> {
    try {
      const result = await this.productRepository.save({
        ...input,
      });
      if (!result) {
        throw new NotFoundException(`insert error`);
      }
      return result;
    } catch (error) {
      throw new HttpException(
        {
          message: 'query insert error',
          error: error.sqlMessage,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  // 상품카테고리 수정
  async modify(
    pc_uid: number,
    input: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    await this.productRepository.update({ pc_uid: pc_uid }, { ...input });
    const updatedProduct = this.findOne(pc_uid);
    if (!updatedProduct) {
      throw new NotFoundException(`can't find id ${pc_uid}`);
    }
    return updatedProduct;
  }

  // 상품카테고리 삭제
  async delete(id: number): Promise<ProductCategory> {
    const product = await this.findOne(id);
    const result = await this.productRepository.remove(product);
    return result;
  }

  // 상품카테고리 리스트 전체 조회
  async findAll(): Promise<ProductCategory[]> {
    const result = await this.productRepository.find({});
    return result;
  }

  // 상품카테고리 리스트 하나 조회
  async findOne(id: number): Promise<ProductCategory> {
    const product = await this.productRepository.findOne({
      where: { pc_uid: id },
    });
    return product;
  }
}
