import { Types } from "mongoose";

export interface IICategory{
    _id?:Types.ObjectId,
    name:string,
    slug:string,
    createdBy: Types.ObjectId;
}