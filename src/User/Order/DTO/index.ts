import { IsEnum, IsString } from "class-validator"
import { OrderStatus, PaymentMethod } from "src/common"

export class CreateOrderDTO{
    
    @IsString()
    address:string

    @IsEnum(PaymentMethod)
    @IsString()
    paymentMethod:string

   
}