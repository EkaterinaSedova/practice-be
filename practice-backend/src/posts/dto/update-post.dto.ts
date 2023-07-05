import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdatePostDto {
    @ApiProperty({
        description: 'Post ID'
    })
    readonly id: number;

    @ApiPropertyOptional({
        description: 'Post content'
    })
    readonly content: string;

    @ApiPropertyOptional({
        description: 'Post images',
        type: 'string',
        format: 'binary'
    })
    readonly images: string[];
}