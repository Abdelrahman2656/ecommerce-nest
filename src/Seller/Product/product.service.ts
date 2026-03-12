import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudServices, DiscountType, generateID, messages } from 'src/common';
import { CategoryService } from 'src/Dashboard/Category/category.service';
import { CreateProductDTO } from './DTO';
import { TUser } from 'DB/Models/User/user.schema';
import { TProduct } from 'DB/Models/Product/product.schema';
import { IImage } from 'DB/Models/Category/category.schema';
import { ProductRepository } from 'DB/Models/Product/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cloudService: CloudServices,
     private readonly productRepository:ProductRepository
  ) {}

  //create product
  async create(
    createProductDTO: CreateProductDTO,
    user: TUser,
   files: {
    mainImage?: Express.Multer.File[],
    subImages?: Express.Multer.File[]
  },
    
  ): Promise<TProduct> {
    //get dto
    let {
      title,
      description,
      colors,
      sizes,
      attribute,
      price,
      discount,
      discountType,
      stock,
      category,
      
      rate
    } = createProductDTO;
    //check category exist
    const categoryExist = await this.categoryService.findOne({ _id: category });
    if (!categoryExist) {
      throw new NotFoundException(messages.product.notFound);
    }
    //check if percentage
    let discountValue = 100;
    if (discountType == DiscountType.PERCENTAGE && discountValue > 100) {
      throw new BadRequestException(messages.product.lessThan);
    }
    //upload main image
    const folderId = generateID();
    const folder = `Ecommerce-Nest/User/${user._id}/Product/${folderId}`;
    let mainImage:IImage |undefined 
    if (files.mainImage) {
      const file = files.mainImage[0];
       const {secure_url,public_id} = await this.cloudService.upload({
        path: file.path,
        folder: `${folder}/MainImage`,
      });
      mainImage={secure_url,public_id}
    }
    //upload images
    let subImages:IImage[] = []
    if (files?.subImages?.length) {
     subImages =await this.cloudService.uploadFiles(files.subImages , `${folder}/SubImages`)
    }
    //prepare data
    const product:Partial<TProduct>={
        title,
      description,
      colors,
      sizes,
      attribute,
      price,
      discount,
      discountType,
      stock,
      category,
      createdBy : user._id,
      updatedBy: user._id,
      mainImage,
      subImages,
      folderId,
      rate
    }
    const createdProduct = await this.productRepository.create(product)
    if (!createdProduct) {
      throw new BadRequestException(messages.product.failToCreate);
    }
    return createdProduct
  }
}
