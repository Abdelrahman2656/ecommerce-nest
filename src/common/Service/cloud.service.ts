import { Injectable } from '@nestjs/common';
import cloudinary from 'Config/cloud.config';
interface IUpload {
  path: string;
  folder?: string;
  public_id?: string;
}
@Injectable()
export class CloudServices {
  //upload
  async upload({ path, folder, public_id }: IUpload) {
    return await cloudinary.uploader.upload(path, { folder, public_id });
  }
  //upload files
  async uploadFiles(files: Express.Multer.File[], folder: string) {
    let images: object[] = [];
    for (const file of files) {
      const { secure_url, public_id } = await this.upload({
        path: file.path,
        folder,
      });
      images.push({ secure_url, public_id });
    }
    return images;
  }
  //delete file
 async deleteFile(public_id :string){
 return await cloudinary.uploader.destroy(public_id)
 }
  //delete file resources
async deleteFileResources (path:string){
return await cloudinary.api.delete_resources_by_prefix(path)
}
  //delete folder
  async deleteFolder (path:string){
    await this.deleteFileResources(path)
    await cloudinary.api.delete_folder(path)
  }
}
