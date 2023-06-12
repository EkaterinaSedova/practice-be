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
import {UpdatePostDto} from "./dto/update-post.dto";

@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}


    //получение всех постов пользователя
    @UseGuards(JwtAuthGuard)
    @Get()
    getPostsByUser(@Body() postDto: CreatePostDto) {
        return this.postService.getPostsByUser(postDto.user_id);
    }

    //создание поста
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    createPost(@Body() postDto: CreatePostDto,
               @UploadedFiles() images) {
        return this.postService.createPost(postDto, images);
    }

    //удаление поста (и всех относящихся к нему лайков и комментов)
    @UseGuards(JwtAuthGuard)
    @Delete()
    deletePost(@Body() postDto: DeletePostDto) {
        return this.postService.deletePost(postDto.post_id);
    }

    //обновление поста
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post('/update')
    updatePost(@Body() dto: UpdatePostDto,
               @UploadedFiles() images) {
        return this.postService.updatePost(dto, images)
    }

}
