import { CategoryRepository } from "DB/Models/Category/category.repository";
import { CreateCategoryDTO } from "./DTO";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { messages } from "src/common";
import { TUser } from "DB/Models/User/user.schema";
import { TCategory } from "DB/Models/Category/category.schema";

@Injectable()
export class CategoryService {
    constructor(private categoryRepository:CategoryRepository){}
//create
async create(CreateCategoryDTO:CreateCategoryDTO , user:TUser):Promise<TCategory>{
//get data
 console.log('User object:', user);  // 👈 شوف إيه اللي جاي
    console.log('User _id:', user._id);
const{name}= CreateCategoryDTO
//check existence
 
 const categoryExist = await this.categoryRepository.findOne({name})
 console.log(categoryExist);
 
 if(categoryExist){
throw new ConflictException(messages.category.alreadyExist)
 }
 //prepare data
 const category ={
    name , 
    createdBy:user._id
 }
 const createdCategory = await this.categoryRepository.create(category)
 if(!createdCategory){
throw new BadRequestException(messages.category.failToCreate)
 }
 return createdCategory
}

}