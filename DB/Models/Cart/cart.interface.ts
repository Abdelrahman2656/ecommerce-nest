import { Types } from "mongoose";

export interface IProduct {
    productId:Types.ObjectId,
    quantity:number,
    finalPrice:number
}