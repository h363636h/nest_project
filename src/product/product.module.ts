import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multiOpt } from '../common/fileConfig/fileUploadConfig';
import { ProductCategory } from 'src/database/entities/productCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductCategory]),
    MulterModule.register(multiOpt),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
