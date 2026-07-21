import { SetMetadata } from "@nestjs/common"

export const publicDecorator = ()=>{
    return SetMetadata('public','public')
}