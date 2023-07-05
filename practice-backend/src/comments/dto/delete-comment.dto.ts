import {ApiProperty} from "@nestjs/swagger";

export class DeleteCommentDto {
    @ApiProperty({
        description: "Comment to delete ID"
    })
    readonly comment_id: number;
}