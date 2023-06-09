import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string;

    @Length(6, 16, {message: "Пароль должен быть не короче 6 и не длиннее 16 символов"})
    readonly password: string;

    @IsString({message: "Имя должно быть строкой"})
    readonly firstname: string;

    @IsString({message: "Фамилия должна быть строкой"})
    readonly lastname: string;
}