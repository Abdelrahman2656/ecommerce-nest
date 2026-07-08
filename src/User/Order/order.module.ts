import { Module } from "@nestjs/common";
import { cartModel } from "DB/Models/Cart/cart.models";
import { orderModel } from "DB/Models/Order/order.models";
import { productModel } from "DB/Models/Product/product.model";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "DB/Models/Order/order.repository";
import { ProductRepository } from "DB/Models/Product/product.repository";
import { CartRepository } from "DB/Models/Cart/cart.repository";
import { StripeServices } from "src/common/Payment/Stripe/stripe.service";

@Module({
    imports:[cartModel,orderModel , productModel],
    controllers:[OrderController],
    providers:[OrderService , OrderRepository , ProductRepository , CartRepository ,StripeServices]

})
export class OrderModule {}