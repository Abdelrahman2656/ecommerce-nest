import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/common";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}
    //get user
    @Get('profile')
   @Auth('user')
    @ApiBearerAuth()
    profile(@Req() req:Request){
        console.log(req['user']);
        return {message:"done" , data:req['user']}
    }
}