import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Subscription} from "./subscription.model";

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [
    SequelizeModule.forFeature([User, Subscription])
  ]
})
export class SubscriptionsModule {}
