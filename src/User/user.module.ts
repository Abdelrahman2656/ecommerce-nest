import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TokenService } from "src/Auth/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "DB/Models/User/user.repository";
import { userModule } from "DB/Models/User/user.models";

@Module({
    imports:[userModule],
    controllers:[UserController],
    providers:[UserService,TokenService ,JwtService ,UserRepository]
})
export class UserModule {

}