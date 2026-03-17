import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import slugify from 'slugify';
import { IICategory } from './category.interface';
//interface
export interface IImage {
  secure_url: string;
  public_id: string;
}
//schema
@Schema({ timestamps: true })
export class Category implements IICategory{

  @Prop({ type: String, required: true, unique: true, trim: true ,maxLength:20 , minLength:3})
  name: string;
  @Prop({
    type: String,
    default: function () {
      return slugify(this.name);
    },
    unique: true,
    trim: true,
  })
  slug: string;
  @Prop({ type: { secure_url: String, public_id: String } })
  image: IImage;
  @Prop({type:String})
  folderId:string
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}
export const categorySchema = SchemaFactory.createForClass(Category);
//pagination
categorySchema.plugin(mongoosePaginate)
//type
export type TCategory = HydratedDocument<Category> & Document;
