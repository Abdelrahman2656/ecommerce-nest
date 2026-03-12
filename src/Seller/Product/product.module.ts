
import { Module } from '@nestjs/common';
import { ProductRepository } from 'DB/Models/Product/product.repository';
import { CloudServices } from 'src/common';
import { CategoryService } from 'src/Dashboard/Category/category.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productModel } from 'DB/Models/Product/product.model';
import { CategoryRepository } from 'DB/Models/Category/category.repository';
import { categoryModel } from 'DB/Models/Category/category.models';

@Module({
  imports: [productModel,categoryModel],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    CloudServices,
    CategoryService,
    CategoryRepository
  ],
})
export class ProductModule {}
