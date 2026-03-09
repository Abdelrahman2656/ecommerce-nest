import { SetMetadata } from "@nestjs/common"

export const CloudName = (folder:string)=>{
    return SetMetadata("cloud_name",folder)
}