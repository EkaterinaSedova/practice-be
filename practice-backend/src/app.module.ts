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

@Module({
  imports: [
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
      models: [User, Post],
      autoLoadModels: true,
      }),
      UsersModule,
      PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
