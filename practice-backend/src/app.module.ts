import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/user.model";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/post.model";
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import {Comment} from "./comments/comment.model";
import {Like} from "./likes/like.model";
import {Subscription} from "./subscriptions/subscription.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join('./resources'),
      }),
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Post, Like, Comment, Subscription],
      autoLoadModels: true,
      }),
      UsersModule,
      PostsModule,
      SubscriptionsModule,
      LikesModule,
      CommentsModule,
      AuthModule,
      FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
