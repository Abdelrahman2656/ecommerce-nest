import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
      {
        productId: { type: SchemaTypes.ObjectId, ref: Product.name },
        quantity: { type: Number, required: true },
        finalPrice: { type: Number, required: true },
      },
    ],
  })
  products: IProduct[];
  @Prop({ type: Number, required: true })
  subTotal: number;
}
export const cartSchema = SchemaFactory.createForClass(Cart);

//cart hook
cartSchema.pre('save', async function () {
  this.subTotal = this.products.reduce(
    (acc:number, prod:any) => acc + (prod.quantity * prod.finalPrice),
    0
  );

});
//type
export type TCart = HydratedDocument<Cart> & Document;
