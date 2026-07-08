import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartRepository } from 'DB/Models/Cart/cart.repository';
import { OrderRepository } from 'DB/Models/Order/order.repository';
import { TOrder } from 'DB/Models/Order/order.schema';
import { ProductRepository } from 'DB/Models/Product/product.repository';
import { TUser } from 'DB/Models/User/user.schema';
import { messages, OrderStatus, PaymentMethod } from 'src/common';
import { CreateOrderDTO } from './DTO';
import { Types } from 'mongoose';
import { StripeServices } from 'src/common/Payment/Stripe/stripe.service';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private cartRepository: CartRepository,
    private productRepository: ProductRepository,
    private stripeServices: StripeServices,
  ) {}
  //create order
  async create(createOrderDTO: CreateOrderDTO, user: TUser): Promise<TOrder> {
    //get data from body
    const { address, paymentMethod  } = createOrderDTO;
    const userId = user._id;
    //find cart exist
    const cartExistence = await this.cartRepository.findOne(
      { user: userId },
      {},
      {
        populate: [
          {
            path: 'products.productId',
            select: 'title price discount finalPrice',
          },
        ],
      },
    );
    if (!cartExistence) {
      throw new NotFoundException(messages.cart.notFound);
    }
    //prepare order
    const order: Partial<TOrder> = {
      user: userId,
      cart: cartExistence._id,
      address,
      paymentMethod,
      
      productItems: cartExistence.products.map((obj) => {
        return {
          id: obj.productId._id,
          title: obj.productId['title'],
          price: obj.productId['price'],
          discount: obj.productId['discount'],
          finalPrice: obj.productId['finalPrice'],
          mainImage: obj.mainImage,
          quantity: obj.quantity,
        };
      }),
      finalPriceOrder: cartExistence.products.reduce((acc, cur) => {
        return acc + cur.productId['finalPrice'] * cur.quantity;
      }, 0),
    };
    //create order
    const createdOrder = await this.orderRepository.create(order);
    if (!createdOrder) {
      throw new BadRequestException(messages.order.failToCreate);
    }
    //update stock and clear cart
    if (paymentMethod == PaymentMethod.CASH) {
      //update stock
      for (const product of cartExistence.products) {
        await this.productRepository.updateOne(
          { _id: product.productId },
          { $inc: { stock: -product.quantity } },
        );
      }
      //empty cart
      cartExistence.products = [];
      await cartExistence.save();
    }
    return createdOrder;
  }
  //pay with stripe
  async payWithStripe(orderId: Types.ObjectId, user: TUser) {
    //check order exist
    const orderExistence = await this.orderRepository.findOne({
      _id: orderId,
      orderStatus: OrderStatus.PENDING,
    });
    if (!orderExistence) {
      throw new NotFoundException(messages.order.notFound);
    }
    //prepare
    const line_items = orderExistence.productItems.map((product) => {
      return {
        quantity: product.finalPrice,
        price_data: {
          currency: 'egp',
          product_data: {
            name: product.title,
            images: [product.mainImage.secure_url],
          },
          unit_amount: product.finalPrice * 100,
        },
      };
    });

    const session = await this.stripeServices.checkOut({
      line_items,
      customer_email: user['email'] || user.email,
      metadata: { orderId: orderExistence.id },
    });
    return session;
  }
}
