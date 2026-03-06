import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Auth, cloudValidation, messages, multerOptions, UserRole } from "src/common";
import { CreateCategoryDTO } from "./DTO";
import { User } from "src/common/Decorator/user.decorator";
import type{ TUser } from "DB/Models/User/user.schema";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('dashboard/category')
@Auth(UserRole.ADMIN)
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

@Post()
@UseInterceptors(FileInterceptor('image' , multerOptions(cloudValidation.image)))
    async create(@Body() createCategoryDTO:CreateCategoryDTO ,@User() user:TUser , @UploadedFile() file:Express.Multer.File){
       
        
const category =await this.categoryService.create(createCategoryDTO,user ,file)
return {message:messages.category.createdSuccessfully , CategoryData : category}
}
}