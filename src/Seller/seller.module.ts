import { Module } from "@nestjs/common";
import { ProductModule } from "./Product/product.module";

@Module({
    imports:[ProductModule],
    controllers:[],
    providers:[]
})
export class SellerModule{}