import { CategoryRepository } from "DB/Models/Category/category.repository";
import { CreateCategoryDTO } from "./DTO";
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { CloudServices, messages } from "src/common";
import { TUser } from "DB/Models/User/user.schema";
import { TCategory } from "DB/Models/Category/category.schema";

@Injectable()
export class CategoryService {
    constructor(private categoryRepository:CategoryRepository , private readonly cloudServices:CloudServices){}
//create
async create(CreateCategoryDTO:CreateCategoryDTO , user:TUser ,file:Express.Multer.File):Promise<TCategory>{
//get data
 
const{name}= CreateCategoryDTO
const authUser = user._id

//check existence
 
 const categoryExist = await this.categoryRepository.findOne({name})
 console.log(categoryExist);
 
 if(categoryExist){
throw new ConflictException(messages.category.alreadyExist)
 }
 //upload image
 const folderId=Math.ceil(Math.random() * 1000 + 9999).toString()
 const {secure_url,public_id}= await this.cloudServices.upload({path:file.path , folder:`Ecommerce-Nest/User/${authUser}/Category/${folderId}`})
 //prepare data
 const category ={
    name , 
    createdBy:authUser,
    folderId,
    image:{secure_url,public_id}
 }
 const createdCategory = await this.categoryRepository.create(category)
 if(!createdCategory){
throw new BadRequestException(messages.category.failToCreate)
 }
 return createdCategory
}

}