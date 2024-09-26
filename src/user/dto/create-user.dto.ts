import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDTO {
    
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    readonly email: string;
    
    @IsPhoneNumber()
    readonly phone: string;
}