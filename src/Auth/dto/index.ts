import { IsEmail,  IsEnum,  IsNotEmpty,  IsOptional,  IsString, IsStrongPassword, MinLength } from 'class-validator';
import { UserRole } from '../common';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsEmail()
  email:string
  @IsStrongPassword()
  password:string
  @IsString()
  @IsEnum(UserRole)
  @IsOptional()
  role?:UserRole
}
//login 
export class LoginDTO  {
    @IsEmail()
  email:string
  @IsStrongPassword()
  password:string
}
