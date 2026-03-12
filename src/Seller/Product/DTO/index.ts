import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsPositive,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator';
import type { IImage } from 'DB/Models/Category/category.schema';
import { IAttribute } from 'DB/Models/Product/product.schema';
import { Types } from 'mongoose';
import { DiscountType } from 'src/common';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(4)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  description: string;

  @Transform(({ value }) => {
  if (typeof value === "string") {
    return JSON.parse(value);
  }
  return value;
})
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  colors?: string[];

  @Transform(({ value }) => {
  if (typeof value === "string") {
    return JSON.parse(value);
  }
  return value;
})
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  sizes?: string[];

  @Transform(({ value }) => {
  if (typeof value === "string") {
    return JSON.parse(value);
  }
  return value;
})
  
  @IsOptional()
  @IsArray()
  attribute?: IAttribute[];

  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @IsOptional()
  discount?: number;

  @IsString()
  @IsEnum(DiscountType)
  @IsOptional()
  discountType?: DiscountType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  stock?: number;

 

  @IsNumber()
  @Type(()=> Number)
  @IsPositive()
  @IsOptional()
  rate?:number

  @IsMongoId()
  @Type(() => Types.ObjectId)
  category: Types.ObjectId;
}
