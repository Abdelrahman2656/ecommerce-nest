import {
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
interface IImage {
  secure_url: string;
  public_id: string;
  folderId: string;
}

//create category
export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;
  @IsObject()
  image: IImage;
}

//update category
export class UpdateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  name?: string;
  
}
