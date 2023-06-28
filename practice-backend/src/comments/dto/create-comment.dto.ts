import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        description: "Commentator ID"
    })
    readonly user_id: number;

    @ApiProperty({
        description: "Commented post ID"
    })
    readonly post_id: number;

    @ApiProperty({
        description: "Comment content"
    })
    readonly content: string;
}