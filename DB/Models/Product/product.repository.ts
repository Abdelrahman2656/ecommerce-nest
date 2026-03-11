import { Injectable } from "@nestjs/common";
import { DBservice } from "DB/dbservice.service";
import { Product, TProduct } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductRepository extends DBservice<TProduct>{
constructor( @InjectModel(Product.name) productModel:Model<TProduct> ){
    super(productModel)
}
}