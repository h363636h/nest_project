import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/database/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // 상품 등록
  async create(input: CreateProductDto): Promise<Product> {
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
  // 상품 수정
  async modify(p_uid: number, input: UpdateProductDto): Promise<Product> {
    await this.productRepository.update({ p_uid: p_uid }, { ...input });
    const updatedProduct = this.findOne(p_uid);
    if (!updatedProduct) {
      throw new NotFoundException(`can't find id ${p_uid}`);
    }
    return updatedProduct;
  }

  // 상품 삭제
  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);
    const result = await this.productRepository.remove(product);

    // 소프트 삭제 (deleteAt 여부 판단) : 실제 데이터 삭제 x, select 시 deleteAt 필드 확인 후 select함
    //const result = await this.productRepository.softRemove({p_uid : id});
    return result;
  }

  // 상품 리스트 전체 조회
  async findAll(): Promise<Product[]> {
    const result = await this.productRepository.find({});
    return result;
  }

  // 상품 리스트 하나 조회
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { p_uid: id },
    });
    return product;
  }
}
