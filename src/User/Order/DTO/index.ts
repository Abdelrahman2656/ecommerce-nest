import { IsEnum, IsString } from "class-validator"
import { PaymentMethod } from "src/common"

export class CreateOrderDTO{
    
    @IsString()
    address:string

    @IsEnum(PaymentMethod)
    @IsString()
    paymentMethod:string
}