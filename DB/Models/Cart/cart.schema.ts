import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';
import { IProduct } from './cart.interface';
import { Product } from '../Product/product.schema';
import { User } from '../User/user.schema';

//schema
@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({
    type: [
      raw({
        productId: { type: SchemaTypes.ObjectId, ref: Product.name },
        quantity: { type: Number, required: true },
        finalPrice: { type: Number, required: true },
      }),
    ],
  })
  products: IProduct[];
  @Prop({ type: Number })
  totalCartPrice: number;
  @Prop({ type: Number, default: 0, min: 0 })
  discount: number;

  @Prop({ type: Number })
  totalCartPriceAfterDiscount: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, unique: true })
  createdBy: Types.ObjectId;
}
export const cartSchema = SchemaFactory.createForClass(Cart);

//cart hook
cartSchema.pre('save', function () {
  this.totalCartPrice = this.products.reduce(
    (acc, prod) => acc + prod.quantity * prod.finalPrice,
    0,
  );

  this.totalCartPriceAfterDiscount =
    this.totalCartPrice - this.discount;
});
//type
export type TCart = HydratedDocument<Cart> & Document;
