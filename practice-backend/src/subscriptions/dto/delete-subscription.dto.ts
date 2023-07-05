import {ApiProperty} from "@nestjs/swagger";

export class DeleteSubscriptionDto {
    @ApiProperty({
        description: 'Subscription ID'
    })
    readonly id: number;
}