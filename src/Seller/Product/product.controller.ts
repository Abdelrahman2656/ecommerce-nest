import { Body, Controller, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import type { TUser } from "DB/Models/User/user.schema";
import { Auth, CloudInterceptor, CloudName, cloudValidation, messages, multerOptions, User, UserRole } from "src/common";
import { CreateProductDTO } from "./DTO";
import { ProductService } from "./product.service";

@Controller('seller/product')
@ApiTags('Product Group')
@Auth(UserRole.ADMIN,UserRole.SELLER)
@CloudName('Product')
export class ProductController {
  constructor(private readonly productService:ProductService) {}

  //create product
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{name:"mainImage" , maxCount:1 }, {name:"subImages" , maxCount:5}] , multerOptions(cloudValidation.image)),CloudInterceptor)
  async create(@Body() createProductDTO:CreateProductDTO , @UploadedFiles() files: {
    mainImage?: Express.Multer.File[],
    subImages?: Express.Multer.File[]
  }, @User() user:TUser  ){
    const product = await this.productService.create(createProductDTO, user , files)
    return {message:messages.product.createdSuccessfully , success:true , ProductData:product}
  }

}