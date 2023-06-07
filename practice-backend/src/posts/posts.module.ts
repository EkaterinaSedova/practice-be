import {Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {User} from "../users/user.model";
import {Like} from "../likes/like.model";
import {Comment} from "../comments/comment.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post, Like, Comment])
  ]
})
export class PostsModule {}
