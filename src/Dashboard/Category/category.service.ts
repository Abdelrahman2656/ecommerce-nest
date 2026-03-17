import { CategoryRepository } from 'DB/Models/Category/category.repository';
import { CreateCategoryDTO, UpdateCategoryDTO } from './DTO';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudServices, messages, UserRole } from 'src/common';
import { TUser } from 'DB/Models/User/user.schema';
import { TCategory } from 'DB/Models/Category/category.schema';
import { QueryFilter, Types } from 'mongoose';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private readonly cloudServices: CloudServices,
  ) {}
  async findOne(filter:QueryFilter<TCategory>){
    return await this.categoryRepository.findOne(filter)
  }
  //create
  async create(
    CreateCategoryDTO: CreateCategoryDTO,
    user: TUser,
  ): Promise<TCategory> {
    //get data

    const { name, image } = CreateCategoryDTO;
    const authUser = user._id;

    //check existence

    const categoryExist = await this.categoryRepository.findOne({ name });
    console.log(categoryExist);

    if (categoryExist) {
      throw new ConflictException(messages.category.alreadyExist);
    }

    //prepare data
    const category = {
      name,
      createdBy: authUser,
      folderId: image.folderId,
      image: {
        secure_url: image.secure_url,
        public_id: image.public_id,
      },
    };
    const createdCategory = await this.categoryRepository.create(category);
    if (!createdCategory) {
      throw new BadRequestException(messages.category.failToCreate);
    }
    return createdCategory;
  }
  //find all 
  async findAll(){
    
  }
  //update
  async update(
    id: Types.ObjectId,
    updateCategoryDTO: UpdateCategoryDTO,
     file: Express.Multer.File,
  ): Promise<TCategory> {
    //get from dto
    const { name } = updateCategoryDTO;
    
    //check category exist
    const categoryExist = await this.categoryRepository.findOne({ _id: id });
    if (!categoryExist) {
      throw new NotFoundException(messages.category.notFound);
    }
    //name
    if (name) {
      const nameExist = await this.categoryRepository.findOne({ name });
      if (nameExist) {
        throw new ConflictException(messages.category.alreadyExist);
      }
      categoryExist.name = name;
      categoryExist.slug = slugify(name);
    }
    //image
    if (file) {
      const { secure_url } = await this.cloudServices.upload({
        path: file.path,
        public_id: categoryExist.image.public_id,
      });
      categoryExist.image.secure_url = secure_url;
    }
    const categoryUpdated = await categoryExist.save();
    if (!categoryUpdated) {
      throw new BadRequestException(messages.category.failToUpdate);
    }
    return categoryUpdated;
  }
  //delete
  async delete(id:Types.ObjectId , user:TUser):Promise<TCategory>{
    //user id
    const authUser = user._id
    //check category exist
    const categoryExist = await this.findOne({ _id:id })
    if(!categoryExist)throw new NotFoundException(messages.category.notFound)
    //check user
  if (categoryExist.createdBy.toString() !== authUser.toString() || !UserRole.ADMIN ) {
    throw new ForbiddenException(messages.category.notAllowed);
  
  }
    //delete image
    if(categoryExist.image?.public_id){
     await this.cloudServices.deleteFolder(`Ecommerce-Nest/User/${categoryExist.createdBy._id}/Category/${categoryExist.folderId}`)
    }
    //find and delete
    const categoryDeleted = await this.categoryRepository.findOneAndDelete({ _id:id})
    if(!categoryDeleted){
     throw new BadRequestException(messages.category.failToDelete)
    }
    return categoryDeleted
  }
}
