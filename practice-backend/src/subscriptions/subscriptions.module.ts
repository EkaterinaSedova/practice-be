import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Subscription} from "./subscription.model";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, JwtService],
  imports: [
    SequelizeModule.forFeature([User, Subscription])
  ]
})
export class SubscriptionsModule {}
