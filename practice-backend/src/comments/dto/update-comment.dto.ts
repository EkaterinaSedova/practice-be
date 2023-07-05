import {ApiOkResponse, ApiProperty} from "@nestjs/swagger";

export class UpdateCommentDto {
    @ApiProperty({
        description: "Comment to update ID"
    })
    readonly id: number;

    @ApiProperty({
        description: "Comment content"
    })
    readonly content: string;
}