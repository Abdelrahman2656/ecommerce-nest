import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/Auth/common";


@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    //get user
    @Get('profile')
   @Auth('user')
    profile(@Req() req:Request){
        console.log(req['user']);
        return {message:"done" , data:req['user']}
    }
}