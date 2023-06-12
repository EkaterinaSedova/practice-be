import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Post} from "../posts/post.model";
import {Like} from "../likes/like.model";
import {Comment} from "../comments/comment.model";
import {Subscription} from "../subscriptions/subscription.model";
import {FilesService} from "../files/files.service";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [UsersController],
  providers: [UsersService, FilesService, JwtService],
  imports: [
      SequelizeModule.forFeature([User, Post, Like, Comment, Subscription])
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
