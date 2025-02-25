import { IsEmail, IsString } from "class-validator"
import { LoginUserDto } from "./login-user.dto"

export class CreateUserDto extends LoginUserDto{

    @IsString()
    username: string
}