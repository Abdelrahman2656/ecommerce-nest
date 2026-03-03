import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoryRepository } from "DB/Models/Category/category.repository";
import { categoryModel } from "DB/Models/Category/category.models";

@Module({
    imports:[categoryModel],
    controllers:[CategoryController],
    providers:[CategoryService , CategoryRepository]
})
export class CategoryModule{}