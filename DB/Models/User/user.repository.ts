import { Injectable } from "@nestjs/common";
import { DBservice } from "DB/dbservice.service";
import { TUser, User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends DBservice<TUser> {
constructor (@InjectModel(User.name) private readonly userModel:Model<TUser> ){
super(userModel)
}
//find by email 
findByEmail(email:string ): Promise<TUser| null>{
    return this.findOne({email})
}
}