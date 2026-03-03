import { Body, Controller, Post, Req } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Auth, messages, UserRole } from "src/common";
import { CreateCategoryDTO } from "./DTO";
import { User } from "src/common/Decorator/user.decorator";
import type{ TUser } from "DB/Models/User/user.schema";

@Controller('dashboard/category')
@Auth(UserRole.ADMIN)
export class CategoryController {
    constructor(private readonly categoryService:CategoryService){}

@Post()
    async create(@Body() createCategoryDTO:CreateCategoryDTO ,@User() user:TUser){
const category =await this.categoryService.create(createCategoryDTO,user)
return {message:messages.category.createdSuccessfully , CategoryData : category}
}
}