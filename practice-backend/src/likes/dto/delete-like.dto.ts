import {ApiProperty} from "@nestjs/swagger";

export class DeleteLikeDto {
    @ApiProperty({
        description: 'Like ID'
    })
    readonly id: number;
}