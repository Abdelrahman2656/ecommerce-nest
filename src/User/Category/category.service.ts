import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from 'DB/Models/Category/category.repository';
import { Types } from 'mongoose';
import { CloudServices, messages } from 'src/common';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private readonly cloudServices: CloudServices,
  ) {}
  //find all
  async findAll() {
    //check category
    const category = await this.categoryRepository.find(
      {},
      '-createdAt -updatedAt -__v -image.public_id -image._id',
    );

    //total category
    const totalCategory = await this.categoryRepository.countDocuments();
    return { category, totalCategory };
  }
  //find by id
  async findById(id: Types.ObjectId) {
    //check category exist
    const categoryExist = await this.categoryRepository.findById(id);
    if (!categoryExist) {
      throw new NotFoundException(messages.category.notFound);
    }
    const category = await this.categoryRepository.findOne(
      { _id: id },
      undefined,
      undefined,
      {
        path: 'createdBy',
        select: 'name email',
      },
    );
    return category;
  }
  //find by paginate
  async paginate(page: number = 1, limit: number = 10) {
    const categoryPaginate = await this.categoryRepository.paginate(
      {},
      {
        page,
        limit,
        customLabels: { totalDocs: 'Total Category', docs: 'Category Data' },
        lean:true,
        populate:[{
          path:"createdBy",
          select:"name email"
        }],
        select:"-image.public_id -image._id"
      },
    );
    return categoryPaginate
  }
}
