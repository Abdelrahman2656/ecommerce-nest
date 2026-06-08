import { IsMongoId, IsNumber, IsPositive } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsMongoId()
  productId: Types.ObjectId;
  @IsPositive()
  @IsNumber()
  quantity: number;
}
