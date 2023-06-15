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

@UseGuards(JwtAuthGuard)
@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}


    //получение всех постов пользователя
    @Get('/user')
    getPostsByUser(@Body() postDto: CreatePostDto) {
        return this.postService.getPostsByUser(postDto.user_id);
    }

    //создание поста
    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    createPost(@Body() postDto: CreatePostDto,
               @UploadedFiles() images) {
        return this.postService.createPost(postDto, images);
    }

    //удаление поста (и всех относящихся к нему лайков и комментов)
    @Delete()
    deletePost(@Body() postDto: DeletePostDto) {
        return this.postService.deletePost(postDto.post_id);
    }

    //обновление поста
    @UseInterceptors(FilesInterceptor('images'))
    @Post('/update')
    updatePost(@Body() dto: UpdatePostDto,
               @UploadedFiles() images) {
        return this.postService.updatePost(dto, images)
    }

    //получение постов пользователей, на которых подписан конкретный пользователь
    @Get('/subscriptions')
    getSubPosts(@Body() dto: CreatePostDto) {
        return this.postService.getSubPosts(dto.user_id);
    }

    @Get()
    getPosts() {
        return this.postService.getPosts();
    }

}
