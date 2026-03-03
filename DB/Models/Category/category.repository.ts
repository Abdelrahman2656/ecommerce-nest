import { Injectable } from "@nestjs/common";
import { DBservice } from "DB/dbservice.service";
import { Category, TCategory } from "./category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CategoryRepository extends DBservice<TCategory>{
constructor(@InjectModel(Category.name) categoryModel:Model<TCategory>){
    super(categoryModel)
}
}