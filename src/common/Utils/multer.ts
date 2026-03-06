import { BadRequestException } from "@nestjs/common"
import { diskStorage } from "multer"

export const multerOptions = (allowTypes:string[] = [] , maxSize : number = 2 * 1024 * 1024)=>({
   
        storage:diskStorage({}),
        fileFilter:(req,file,cb)=>{
        if(!allowTypes.includes(file.mimetype)){
            cb(new BadRequestException('Invalid File Type'),false)
        
        }   
        cb(null , true)
        },
        limits:{
            fileSize :maxSize
        }
    
})