import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Auth, CloudName, PipeParseObjectId, UserRole } from 'src/common';
import { CategoryService } from './category.service';

@Controller('user/category')
@ApiTags('Category Group User')
@Auth(UserRole.ADMIN, UserRole.USER)
@CloudName('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  //find all
  @Get()
  async find() {
    const category = await this.categoryService.findAll();
    return { success: true, category };
  }
    //paginate
  @Get('paginate')
  async paginate(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const category = await this.categoryService.paginate(pageNum, limitNum);
    return { success: true, category };
  }
  //find by id
  @Get(':id')
  async findById(@Param('id', PipeParseObjectId) id: Types.ObjectId) {
    const category = await this.categoryService.findById(id);
    return { success: true, CategoryData: category };
  }

}
