import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType, SchemaTypes, Types } from 'mongoose';
import { Category, type IImage } from '../Category/category.schema';
import { DiscountType } from 'src/common';
import { User } from '../User/user.schema';
//interface
interface IAttribute {
  key: string;
  value: string;
}
//schema
@Schema({ timestamps: true })
export class Product {
  //string
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxLength: 10,
    minLength: 4,
  })
  title: string;
  @Prop({
    type: String,
    default: function () {
      return this.title;
    },
    trim: true,
  })
  slug: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
    minLength: 4,
  })
  description: string;
  @Prop({ type: String })
  folderId: string;
  @Prop({ type: [String] })
  colors: string[];
  @Prop({ type: [String] })
  size: string[];
  @Prop({ type: [{ key: String, value: String }] })
  attribute: IAttribute[];
  //number
  @Prop({ type: Number, required: true, min: 1 })
  price: number;
  @Prop({ type: Number, default: 0, min: 0 })
  discount: number;
  @Prop({ type: Number, enum: DiscountType, default: DiscountType.PERCENTAGE })
  discountType: number;
  @Prop({
    type: Number,
    required: true,
    default: function () {
      return this.discountType === DiscountType.PERCENTAGE
        ? this.price - (this.price * (this.discount || 0)) / 100
        : this.price - this.discount;
    },
  })
  finalPrice: number;
  @Prop({type:Number , default:1 ,min:0 })
  stock: number;
  @Prop({type:Number , min:1 , max:5 ,default:5})
  rate: number;
  //images
  @Prop({type:{ secure_url: String, public_id: String } })
  mainImage: IImage;
  @Prop({type: [{ secure_url: String, public_id: String }] })
  subImages: IImage[];
  //objectId
  @Prop({type:SchemaTypes.ObjectId , ref:User.name ,required:true})
  createdBy: Types.ObjectId;
  @Prop({type:SchemaTypes.ObjectId , ref:User.name ,required:true , default:function(){
    return this.createdBy
  }})
  updatedBy: Types.ObjectId;
  @Prop({type:SchemaTypes.ObjectId , ref:Category.name ,required:true})
  category: Types.ObjectId;
}
export const productSchema = SchemaFactory.createForClass(Product);
// type
export type TProduct = HydratedDocument<Product> & Document;
