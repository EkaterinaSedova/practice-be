import {Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {User} from "../users/user.model";
import {Like} from "../likes/like.model";
import {Comment} from "../comments/comment.model";
import {JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";
import {FilesModule} from "../files/files.module";

@Module({
  providers: [PostsService, JwtService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post, Like, Comment]),
      AuthModule,
      FilesModule
  ]
})
export class PostsModule {}
