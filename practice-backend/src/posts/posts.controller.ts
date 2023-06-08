import {Body, Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FilesInterceptor} from "@nestjs/platform-express";

@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    createPost(@Body() postDto: CreatePostDto,
               @UploadedFiles() images) {
        console.log(postDto)
        return this.postService.createPost(postDto, images);
    }
}
