import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Subscription} from "./subscription.model";
import {CreateSubscriptionDto} from "./dto/create-subscription.dto";

@Injectable()
export class SubscriptionsService {

    constructor(@InjectModel(Subscription) private suscriptionRepository: typeof Subscription) {}

    //создание подписки
    async createSubscription(dto: CreateSubscriptionDto) {
        const subscription = await this.suscriptionRepository.create(dto);
        return subscription;
    }

    //отмена (удаление) подписки
    async deleteSubscription(subscriber_id, subscriber_to_id) {
        const subscription = await this.suscriptionRepository.destroy({where: {
                subscriber_id: subscriber_id,
                subscriber_to_id: subscriber_to_id
        }})
        return {message: "Подписка отменена"}
    }

    //получение всех подписок пользователя по id пользователя
    async getSubscriptionsByUser(subscriber_id) {
        const subscriptions = await this.suscriptionRepository.findAll({where: {subscriber_id}});
        return subscriptions;
    }


    //получение всех подписчиков пользователя по id пользователя
    async getSubscribers(subscriber_to_id) {
        const subscribers = await this.suscriptionRepository.findAll({where: {subscriber_to_id}});
        return subscribers;
    }

}
