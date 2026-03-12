import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, Observable, throwError } from 'rxjs';
import { v4 as uuid } from "uuid";
import { CloudServices } from '../Service';

@Injectable()
export class CloudInterceptor implements NestInterceptor {
  constructor(
    private cloudServices: CloudServices,
    private reflector: Reflector,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ):Promise<Observable<any>> {
    //get folder name
    const folder_name = this.reflector.get('cloud_name', context.getClass());
    //get request
    const request = context.switchToHttp().getRequest();
    const file = request.file as Express.Multer.File;
    const authUser = request.user ;

    //upload image
    if (file) {
      const folderId = uuid();
      const folder = `Ecommerce-Nest/User/${authUser._id}/${folder_name}/${folderId}`;
     
      const {secure_url,public_id} = await this.cloudServices.upload({ path: file.path, folder });
      request.body.image = {secure_url,public_id ,folderId}
    }
    return next.handle().pipe(
        catchError((err)=>{
            //logic of code
            if(request.body?.image){
            const folderPath=`Ecommerce-Nest/User/${authUser._id}/${folder_name}/${request.body.image.folderId}`
            this.cloudServices.deleteFolder(folderPath)
            }
          return  throwError(() => err)
        })
    )
  }
}
