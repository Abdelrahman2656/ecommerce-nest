import { Controller,  Post, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

import { Auth, CloudName, messages, User, UserRole } from 'src/common';
import { ApiTags } from '@nestjs/swagger';
import type { TUser } from "DB/Models/User/user.schema";

@Controller('dashboard/cart')
@ApiTags('Cart Group')
@Auth(UserRole.ADMIN,UserRole.SELLER ,UserRole.USER)
@CloudName('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto ,@User() user:TUser) {
   const cart=  await this.cartService.create(createCartDto ,user);
   return{message:messages.cart.createdSuccessfully , success :true , CartData:cart}
  }


}
