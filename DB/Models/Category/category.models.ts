import { MongooseModule } from "@nestjs/mongoose";
import { Category, categorySchema } from "./category.schema";


export const categoryModel = MongooseModule.forFeature([
    {name:Category.name ,schema:categorySchema}
])