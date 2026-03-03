import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckNamePipe implements PipeTransform {
transform(value: any, metadata: ArgumentMetadata) {
    console.log({value ,metadata});
    if(typeof value.name != 'string'){
        throw new BadRequestException('name must be string ')
    }
    return value
}
}