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
import { ProductCategory } from 'src/database/entities/productCategory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  // 상품 등록
  async create(input: CreateProductDto): Promise<Product> {
    try {
      const category_uid = Number(input.p_category);

      // 1. 카테고리 uid 존재하는지 체크
      const getCategoryData = await this.productCategoryRepository.findOne({
        where: { pc_uid: category_uid },
      });

      // 카테고리 uid 없을 경우
      if (!getCategoryData) {
        throw new NotFoundException(
          `Not Found ProductCategory uid =>  ${category_uid}`,
        );
      }

      // 2. 상품 등록 처리
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
    // update : 두개의 객체 인수로 받음 , 첫번째 : where절 / 두번째 : 갱신시킬 object
    // 실패 여부만 return, 결과값 반환 x
    //await this.productRepository.save({ p_uid: p_uid }, { ...input });

    // 1. 상품 uid 존재하는지 체크
    const updatedProduct = this.findOne(p_uid);
    if (!updatedProduct) {
      throw new NotFoundException(`Not Found Product uid => ${p_uid}`);
    }
    const category_uid = Number(input.p_category);
    
    // 2. 카테고리 uid 존재하는지 체크
    const getCategoryData = await this.productCategoryRepository.findOne({
      where: { pc_uid: category_uid },
    });

    // 카테고리 uid 없을 경우
    if (!getCategoryData) {
      throw new NotFoundException(
        `Not Found ProductCategory uid =>  ${category_uid}`,
      );
    }

    // 3. 업데이트 처리
    const newProduct = {
      ...updatedProduct,
      ...input,
    };
    const result = await this.productRepository.save(newProduct);

    return result;
  }

  // 상품 삭제
  async delete(id: number): Promise<Product> {
    const product = await this.findOne(id);
    const result = await this.productRepository.remove(product);
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
