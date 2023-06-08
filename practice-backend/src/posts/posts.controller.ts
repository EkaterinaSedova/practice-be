import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FilesInterceptor} from "@nestjs/platform-express";
import {DeletePostDto} from "./dto/delete-post.dto";

@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Get()
    getPostsByUser(@Body() postDto: CreatePostDto) {
        return this.postService.getPostsByUser(postDto.user_id);
    }
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    createPost(@Body() postDto: CreatePostDto,
               @UploadedFiles() images) {
        return this.postService.createPost(postDto, images);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deletePost(@Body() postDto: DeletePostDto) {
        return this.postService.deletePost(postDto.post_id);
    }
}
