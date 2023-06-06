import {Module} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./post.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([Post])
  ]
})
export class PostsModule {}
