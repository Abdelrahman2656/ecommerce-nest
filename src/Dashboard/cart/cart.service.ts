import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'DB/Models/Category/category.repository';
import { ProductRepository } from 'DB/Models/Product/product.repository';
import { CreateCartDto } from './dto/create-cart.dto';
import { TUser } from 'DB/Models/User/user.schema';
import { TCart } from 'DB/Models/Cart/cart.schema';
import { messages } from 'src/common';
import { CartRepository } from 'DB/Models/Cart/cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  //create cart
  async create(createCartDto: CreateCartDto, user: TUser): Promise<TCart> {
    const { productId, quantity } = createCartDto;
    //check product exist
    const productExist = await this.productRepository.findOne({
      _id: productId,
      stock: { $gte: quantity },
    });
    if(!productExist){
    throw new NotFoundException(messages.cart.notFoundOrOutStock)
    }
    // user have cart or not
    const cart = await this.cartRepository.findOne({user:user._id})

    if(!cart){
       const createCart=await this.cartRepository.create({
        createdBy:user._id,
        user:user._id,
    
      products: [
      {
        productId: productExist._id,
        quantity,
        finalPrice: productExist.finalPrice,
        mainImage:productExist.mainImage
      },
    ],
      })
      return createCart
    }

    // if same product already exist
    let match = false
    for (const [index , product] of cart.products.entries()) {
      if(product.productId.toString() === productId.toString()){
      cart.products[index].quantity+=quantity
      cart.products[index].finalPrice = productExist.finalPrice;
      match = true
      break
      }
      
    }
if(!match){
  cart.products.push({
    productId: productExist._id,
    quantity,
    finalPrice: productExist.finalPrice,
    mainImage:productExist.mainImage
  })
}
const createdCart = await cart.save()
if(!createdCart){
  throw new BadRequestException(messages.cart.failToCreate)
}
return createdCart
  }
}
