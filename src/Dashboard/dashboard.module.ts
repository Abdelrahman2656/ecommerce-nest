import { Module } from "@nestjs/common";

import { CategoryModule } from "./Category/category.module";

@Module({
    imports:[CategoryModule],
    controllers:[],
    providers:[]
})
export class DashboardModule{}