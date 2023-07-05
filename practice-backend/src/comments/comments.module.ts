import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Post} from "../posts/post.model";
import {Comment} from "./comment.model";
import {JwtService} from "@nestjs/jwt";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, JwtService],
  imports: [
    SequelizeModule.forFeature([User, Post, Comment])
  ]
})
export class CommentsModule {}
