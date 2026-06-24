import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { IProductItem } from './order.interface';
import { User } from '../User/user.schema';
import { Cart } from '../Cart/cart.schema';
import { OrderStatus, PaymentMethod } from 'src/common';
import { Product } from '../Product/product.schema';
//schema
@Schema({ timestamps: true })
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name, required: true })
  cart: Types.ObjectId;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod: string;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: function () {
      this.OrderStatus == PaymentMethod.CASH
        ? OrderStatus.PLACED
        : OrderStatus.PENDING;
    },
  })
  orderStatus: string;

  @Prop({
    type: [
      {
        id: { type: SchemaTypes.ObjectId, ref: Product.name },
        title: { type: String, required: true },
        price: Number,
        discount: Number,
        finalPrice: Number,
        quantity: Number,
      },
    ],
  })
  productItems: IProductItem[];

  @Prop({type:Number })
  finalPriceOrder:number
}
export const orderSchema = SchemaFactory.createForClass(Order);

//type
export type TOrder = HydratedDocument<Order> & Document;
