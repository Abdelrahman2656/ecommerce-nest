import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard, RoleGuard } from "../Guards";

export function Auth(...roles:string[]){
return applyDecorators(
    SetMetadata('roles',roles),
    UseGuards(AuthGuard , RoleGuard)
)
}