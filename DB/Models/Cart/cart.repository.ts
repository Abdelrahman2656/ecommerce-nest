import { Injectable } from "@nestjs/common";
import { DBservice } from "DB/dbservice.service";
import { Cart, TCart } from "./cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { cartModel } from "./cart.models";
import { Model } from "mongoose";

@Injectable()
export class cartRepository extends DBservice<TCart>{
constructor(@InjectModel(Cart.name) private cartModel:Model<TCart>){
super(cartModel)
}
}