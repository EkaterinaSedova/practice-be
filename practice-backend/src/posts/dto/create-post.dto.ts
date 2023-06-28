import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiPropertyOptional({
        description: 'Post content',
        example: 'Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy.'
    })
    readonly content: string;

    @ApiProperty({
        description: 'User ID'
    })
    readonly user_id: number;

    @ApiPropertyOptional({
        description: 'Images',
        type: 'string',
        format: 'binary'
    })
    readonly images: string[];
}