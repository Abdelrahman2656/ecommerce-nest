import { MongooseModule } from "@nestjs/mongoose";
import { User, userSchema } from "./user.schema";

//module
export const userModule = MongooseModule.forFeature([
    {name : User.name , schema : userSchema}
])