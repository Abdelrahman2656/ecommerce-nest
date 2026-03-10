import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import type { TUser } from 'DB/Models/User/user.schema';
import { Types } from 'mongoose';
import {
  Auth,
  CloudInterceptor,
  CloudName,
  cloudValidation,
  messages,
  multerOptions,
  PipeParseObjectId,
  UserRole,
} from 'src/common';
import { User } from 'src/common/Decorator/user.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './DTO';

@Controller('dashboard/category')
@ApiTags('Category Group')
@Auth(UserRole.ADMIN)
@CloudName('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //create category
  @Post()
  @UseInterceptors(
    FileInterceptor('image', multerOptions(cloudValidation.image)),
    CloudInterceptor,
  )
  async create(
    @Body() createCategoryDTO: CreateCategoryDTO,
    @User() user: TUser,
  ) {
    const category = await this.categoryService.create(createCategoryDTO, user);
    return {
      message: messages.category.createdSuccessfully,
      CategoryData: category,
    };
  }
  //update category
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', multerOptions(cloudValidation.image)),
  )
  async update(
    @Param('id', PipeParseObjectId) id: Types.ObjectId,
    @Body() updateCategory: UpdateCategoryDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const category = await this.categoryService.update(id, updateCategory, file);
    return {
      message: messages.category.updateSuccessfully,
      CategoryUpdated: category,
    };
  }
}
