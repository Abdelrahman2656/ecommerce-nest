import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRepository } from "DB/Models/User/user.repository";
import { TokenService } from "../Service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenService:TokenService , private userRepository:UserRepository , private reflector:Reflector){}
async canActivate(context: ExecutionContext):Promise<boolean>  {
    //get request
    const request = context.switchToHttp().getRequest()
    const publicDecorator = this.reflector.getAllAndMerge('public',[
        context.getClass(),
        context.getHandler()
    ]) 
    if(publicDecorator.length) return true
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