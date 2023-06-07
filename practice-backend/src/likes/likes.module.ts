import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Post} from "../posts/post.model";
import {Like} from "./like.model";

@Module({
  providers: [LikesService],
  controllers: [LikesController],
  imports: [
    SequelizeModule.forFeature([User, Post, Like])
  ]
})
export class LikesModule {}
