import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto);
    }
}
