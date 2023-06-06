import {Body, Controller, Post} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";

@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    createPost(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto);
    }
}
