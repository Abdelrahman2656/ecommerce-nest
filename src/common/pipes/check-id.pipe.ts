import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class PipeParseObjectId implements PipeTransform{
transform(value: string, metadata: ArgumentMetadata) {
    if(!Types.ObjectId.isValid(value)){
    throw new BadRequestException('Invalid Object ID')
    }
    return new Types.ObjectId(value)
}
}