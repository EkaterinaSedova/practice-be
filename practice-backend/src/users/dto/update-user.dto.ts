import {IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        description: 'User ID',
        example: '12'
    })
    readonly id: string;

    @ApiPropertyOptional({
        description: 'User firstname',
        example: 'Katyona'
    })
    @IsString({message: "Имя должно быть строкой"})
    readonly firstname: string;

    @ApiPropertyOptional({
        description: 'User lastname',
        example: 'Siadova'
    })
    @IsString({message: "Фамилия должна быть строкой"})
    readonly lastname: string;

    @ApiPropertyOptional({
        description: 'User sex',
        example: 'female'
    })
    readonly sex: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    readonly profile_img: any;
}