import { Types } from 'mongoose';

//interface
export interface IProductItem {
  id: Types.ObjectId;
  title: string;
  price: number;
  discount: number;
  finalPrice:number
  quantity: number;
}
