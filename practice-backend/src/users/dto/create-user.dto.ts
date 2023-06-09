import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string;

    @Length(6, 16, {message: "Пароль должен быть не короче 6 и не длиннее 16 символов"})
    readonly password: string;

    readonly firstname: string;
    readonly lastname: string;
}