import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {SubscriptionsService} from "./subscriptions.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {DeleteSubscriptionDto} from "./dto/delete-subscription.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse, ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Subscription')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Unauthorized user'
})
@UseGuards(JwtAuthGuard)
@Controller('/subscriptions')
export class SubscriptionsController {

    constructor(private subscriptionsService: SubscriptionsService) {}

    //создание подписки
    @ApiOperation({
        summary: 'Create subscription'
    })
    @ApiCreatedResponse({
        description: 'Successfully created'
    })
    @Post()
    createSubscription(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.createSubscription(dto);
    }

    //удаление подписки (по id)
    @ApiOperation({
        summary: 'Delete subscription'
    })
    @ApiOkResponse({
        description: 'Successfully deleted'
    })
    @Delete()
    deleteSubscription(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.deleteSubscription(dto.subscriber_id, dto.subscriber_to_id);
    }

    //получение всех подписок пользователя по id пользователя
    @ApiOperation({
        summary: 'Get subscriptions of user'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @Get()
    getSubscriptions(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.getSubscriptionsByUser(dto.subscriber_id);
    }

    //получение всех подписчиков пользователя по id пользователя
    @ApiOperation({
        summary: 'Get subscribers of user'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @Get('/subscribers')
    getSubscribers(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.getSubscribers(dto.subscriber_to_id);
    }

}
