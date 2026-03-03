import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

//create category 
export class CreateCategoryDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name:string
}