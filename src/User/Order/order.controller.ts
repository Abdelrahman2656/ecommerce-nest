import { Auth, CloudName, messages, User, UserRole } from "src/common";
import { OrderService } from "./order.service";
import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateOrderDTO } from "./DTO";
import type { TUser } from "DB/Models/User/user.schema";
import { Types } from "mongoose";
import { publicDecorator } from "src/common/Decorator/public.decorator";

@Controller('user/order')
@ApiTags('Order Group User')
@CloudName('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
 //create order
 @Auth(UserRole.ADMIN, UserRole.USER)
 @Post()
 async create(@Body()createOrderDTO:CreateOrderDTO ,@User() user:TUser){
    const order = await this.orderService.create(createOrderDTO , user)
    return {message:messages.order.createdSuccessfully , OrderData:order}
 }
//pay with stripe
@Auth(UserRole.ADMIN, UserRole.USER)
@Post('pay-with-stripe')
async payWithStripe(@Body('orderId') orderId:Types.ObjectId , @User() user:TUser){
  const order= await this.orderService.payWithStripe(orderId , user)
  return {message:'Order Done Successfully', success:true , paymentData : order}
}

//webhook

@Post('webhook')
@publicDecorator()
async webhook(@Req() req: any) {
  return await this.orderService.webhook(req);
}
}