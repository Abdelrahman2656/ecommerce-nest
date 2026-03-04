import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard, RoleGuard } from "../Guards";
import { Throttle } from "@nestjs/throttler";

export function Auth(...roles:string[]){
return applyDecorators(
    SetMetadata('roles',roles),
     Throttle({ default: { limit: 10, ttl: 60000 } }),
    UseGuards(AuthGuard , RoleGuard)
)
}