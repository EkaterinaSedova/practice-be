import {ApiProperty} from "@nestjs/swagger";

export class DeletePostDto {
    @ApiProperty({
        description: 'Post ID'
    })
    readonly post_id: number;
}