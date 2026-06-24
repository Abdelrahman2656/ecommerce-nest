import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DBservice } from "DB/dbservice.service";
import { Model } from "mongoose";
import { Order, TOrder } from "./order.schema";

@Injectable()
export class OrderRepository extends DBservice<TOrder>{
    constructor(@InjectModel(Order.name) private readonly orderModel:Model<TOrder>){
        super(orderModel)
    }
}