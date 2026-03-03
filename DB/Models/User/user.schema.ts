import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/Auth/common/Enums/roles.enums";

//class schema 
@Schema({timestamps:true})
export class User {
    @Prop({type:String , required:true})
    name:string 
    @Prop({type :String , unique:true})
    email:string
    @Prop({type: String})
    password:string
    @Prop({type:String , enum:UserRole , default:UserRole.USER})
    role:string
}
//schema
export const userSchema = SchemaFactory.createForClass(User)
// user type
export type TUser = User & Document