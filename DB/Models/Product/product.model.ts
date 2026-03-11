import { MongooseModule } from "@nestjs/mongoose";
import { Product, productSchema } from "./product.schema";

//model
const productModel = MongooseModule.forFeature([
    {name:Product.name , schema : productSchema}
])