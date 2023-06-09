import {IsString} from "class-validator";

export class UpdateUserDto {
    readonly id: string;

    @IsString({message: "Имя должно быть строкой"})
    readonly firstname: string;

    @IsString({message: "Фамилия должна быть строкой"})
    readonly lastname: string;

    readonly sex: string;

    readonly profile_img: string;
}