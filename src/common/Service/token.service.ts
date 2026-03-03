import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

@Injectable()
export class TokenService {
constructor(private jwtService:JwtService){}
//sign token 
sign(payload:object , options:JwtSignOptions){
 return this.jwtService.sign(payload,options)
}
//verify token 
verify(token:string , options:JwtVerifyOptions){
return this.jwtService.verify(token , options)
}
}