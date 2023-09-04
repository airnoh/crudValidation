import { IsNotEmpty, IsString } from "class-validator";

export class todoDto{
    @IsString()
    @IsNotEmpty()
    title:string;
}