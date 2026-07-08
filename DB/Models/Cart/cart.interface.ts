import { Types } from "mongoose";
import { IImage } from "../Category/category.schema";

export interface IProduct {
    productId:Types.ObjectId,
    quantity:number,
    finalPrice:number
    mainImage:IImage
}