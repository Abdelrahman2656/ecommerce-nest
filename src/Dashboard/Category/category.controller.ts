import { Body, Controller, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Auth, CloudName, cloudValidation, messages, multerOptions, UserRole } from "src/common";
import { CreateCategoryDTO } from "./DTO";
import { User } from "src/common/Decorator/user.decorator";
import type{ TUser } from "DB/Models/User/user.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { CloudInterceptor } from "src/common/Interceptor";


@Controller('dashboard/category')
@ApiTags("Category Group")
@Auth(UserRole.ADMIN)
@CloudName("Category")
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

@Post()
@UseInterceptors(FileInterceptor('image' , multerOptions(cloudValidation.image)),CloudInterceptor )
    async create(@Body() createCategoryDTO:CreateCategoryDTO ,@User() user:TUser ){
       
        
const category =await this.categoryService.create(createCategoryDTO,user)
return {message:messages.category.createdSuccessfully , CategoryData : category}
}
}