import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {SubscriptionsService} from "./subscriptions.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";
import {DeleteSubscriptionDto} from "./dto/delete-subscription.dto";

@Controller('/subscriptions')
export class SubscriptionsController {

    constructor(private subscriptionsService: SubscriptionsService) {}


    //создание подписки
    @UseGuards(JwtAuthGuard)
    @Post()
    createSubscription(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.createSubscription(dto);
    }

    //удаление подписки (по id)
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteSubscription(@Body() dto: DeleteSubscriptionDto) {
        return this.subscriptionsService.deleteSubscription(dto.id);
    }

    //получение всех подписок пользователя по id пользователя
    @UseGuards(JwtAuthGuard)
    @Get()
    getSubscriptions(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.getSubscriptionsByUser(dto.subscriber_id);
    }

    //получение всех подписчиков пользователя по id пользователя
    @UseGuards(JwtAuthGuard)
    @Get('/subscribers')
    getSubscribers(@Body() dto: CreateSubscriptionDto) {
        return this.subscriptionsService.getSubscribers(dto.subscriber_to_id);
    }

}
