import { Module } from '@nestjs/common';
import { ProductCategoryController } from './productCategory.controller';
import { ProductCategoryService } from './productCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from 'src/database/entities/productCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
