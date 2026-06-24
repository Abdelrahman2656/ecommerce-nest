import { MongooseModule } from "@nestjs/mongoose";
import { Order, orderSchema } from "./order.schema";

//Model
export const orderModel = MongooseModule.forFeature([
    {name:Order.name , schema:orderSchema}
]) 