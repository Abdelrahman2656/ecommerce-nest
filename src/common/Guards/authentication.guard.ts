import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { TokenService } from "../Service";
import { UserRepository } from "DB/Models/User/user.repository";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenService:TokenService , private userRepository:UserRepository){}
async canActivate(context: ExecutionContext):Promise<boolean>  {
    //get request
    const request = context.switchToHttp().getRequest() 
    //get token
    const {authorization} = request.headers
    //check bearer token 
    if(!authorization?.startsWith('Abdo')){
        throw new UnauthorizedException("Invalid Bearer Token")
    }
    const token = authorization.split(' ')[1]
    //verify token 
    const data = this.tokenService.verify(token , {secret:process.env.SECRET_KEY})
    //check user
    const user = await this.userRepository.findOne({_id:data._id})
    if(!user){
        throw new NotFoundException("User Not Found")
    }
    request.user = user
    return true;
}
 
}