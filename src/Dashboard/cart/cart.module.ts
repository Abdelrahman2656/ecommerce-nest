import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { productModel } from 'DB/Models/Product/product.model';
import { cartModel } from 'DB/Models/Cart/cart.models';
import { CartRepository } from 'DB/Models/Cart/cart.repository';
import { ProductRepository } from 'DB/Models/Product/product.repository';
import { ProductService } from 'src/Seller/Product/product.service';

@Module({
  imports:[productModel,cartModel],
  controllers: [CartController],
  providers: [CartService ,CartRepository ,ProductRepository ],


})
export class CartModule {}
