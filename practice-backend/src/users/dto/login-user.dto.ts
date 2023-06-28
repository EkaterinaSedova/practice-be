import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        description: 'Email пользователя',
        example: 'katena.sedova@gmail.com'
    })
    readonly email: string;
    @ApiProperty({
        description: 'Пароль пользователя',
        example: 'qwerty'
    })
    readonly password: string;
}