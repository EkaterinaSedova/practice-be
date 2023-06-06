import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post) {}

    async createPost(dto: CreatePostDto) {
        const post = await this.postRepository.create(dto);
        return post;
    }

}
