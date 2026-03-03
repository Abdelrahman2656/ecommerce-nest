import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// import { Roles } from "../Decorator/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean  {
      //get role
        const roles = this.reflector.get('roles',context.getHandler())
        //get request
        const request = context.switchToHttp().getRequest()
        //check roles
        if(!roles.includes(request.user.role)){
            throw new UnauthorizedException('Not Allowed')
        }
        return true
    }
}