import {ApiProperty} from "@nestjs/swagger";

export class CreateSubscriptionDto {
    @ApiProperty({
        description: 'Subscriber ID'
    })
    readonly subscriber_id: number;

    @ApiProperty({
        description: "Subscriber to ID"
    })
    readonly subscriber_to_id: number;
}