import { Module } from "@nestjs/common";

import { CategoryModule } from "./Category/category.module";
import { CartModule } from './cart/cart.module';

@Module({
    imports:[CategoryModule, CartModule],
    controllers:[],
    providers:[]
})
export class DashboardModule{}