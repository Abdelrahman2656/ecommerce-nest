import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "DB/Models/Category/category.repository";
import { categoryModel } from "DB/Models/Category/category.models";
import { CloudServices } from "src/common";

@Module({
    imports:[categoryModel],
    controllers:[CategoryController],
    providers:[CategoryService , CategoryRepository ,CloudServices]
})
export class CategoryModule{}