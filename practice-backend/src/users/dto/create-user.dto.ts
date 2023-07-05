import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Email пользователя',
        example: 'my.email@gmail.com'
    })
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        example: 'qwerty'
    })
    @Length(6, 16, {message: "Пароль должен быть не короче 6 и не длиннее 16 символов"})
    readonly password: string;

    @ApiProperty({
        description: 'Имя пользователя',
        example: 'John'
    })
    @IsString({message: "Имя должно быть строкой"})
    readonly firstname: string;

    @ApiProperty({
        description: 'Фамилия пользователя',
        example: 'Doe'
    })
    @IsString({message: "Фамилия должна быть строкой"})
    readonly lastname: string;

    @ApiPropertyOptional({
        enum: ['male', 'female', 'unknown'],
        description: 'Пол пользователя',
    })
    readonly sex: string;

    @ApiPropertyOptional({
        description: 'Аватар пользователя'
    })
    readonly profile_img: string;
}