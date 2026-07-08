import { Types } from 'mongoose';
import { IImage } from '../Category/category.schema';

//interface
export interface IProductItem {
  id: Types.ObjectId;
  title: string;
  price: number;
  discount: number;
  finalPrice:number
  quantity: number;
  mainImage:IImage
}
