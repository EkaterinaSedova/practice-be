import {ApiProperty} from "@nestjs/swagger";

export class CreateLikeDto {
    @ApiProperty({
        description: 'Liker ID'
    })
    readonly user_id: number;
    @ApiProperty({
        description: 'Liked post ID'
    })
    readonly post_id: number;
}