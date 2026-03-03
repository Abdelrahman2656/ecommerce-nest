import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

//1- export const Roles = Reflector.createDecorator<string>()

//2-
export const Roles = (...roles:string[])=>{
    return SetMetadata('roles',roles)
}