import {
    Body,
    Controller,
    Delete,
    Get, Param,
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
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConsumes, ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation, ApiParam,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Post')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
    description: 'Unauthorized user'
})
@UseGuards(JwtAuthGuard)
@Controller('/posts')
export class PostsController {

    constructor(private postService: PostsService) {}


    //получение всех постов пользователя
    @ApiOperation({
        summary: 'Get posts of user'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiParam({
        name: 'id',
        description: 'Gets the post id',
    })
    @Get('/user/:id')
    getPostsByUser(@Param() params: any) {
        return this.postService.getPostsByUser(params.id);
    }

    //создание поста
    @ApiOperation({
        summary: 'Create post'
    })
    @ApiCreatedResponse({
        description: 'Successfully created'
    })
    @ApiBadRequestResponse({
        description: 'Bad request'
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images'))
    @Post()
    createPost(@Body() postDto: CreatePostDto,
               @UploadedFiles() images) {
        return this.postService.createPost(postDto, images);
    }

    //удаление поста (и всех относящихся к нему лайков и комментов)
    @ApiOperation({
        summary: 'Delete post'
    })
    @ApiOkResponse({
        description: 'Successfully deleted'
    })
    @Delete()
    deletePost(@Body() postDto: DeletePostDto) {
        return this.postService.deletePost(postDto.post_id);
    }

    //обновление поста
    @ApiOperation({
        summary: 'Update post'
    })
    @ApiCreatedResponse({
        description: 'Successfully updated'
    })
    @ApiBadRequestResponse({
        description: 'Bad request'
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images'))
    @Post('/update')
    updatePost(@Body() dto: UpdatePostDto,
               @UploadedFiles() images) {
        return this.postService.updatePost(dto, images)
    }

    //получение постов пользователей, на которых подписан конкретный пользователь
    @ApiOperation({
        summary: 'Get posts from subscriptions'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiBadRequestResponse({
        description: 'Bad request'
    })
    @ApiParam({
        name: 'id',
        description: 'Gets the post id',
    })
    @Get('/subscriptions/:id')
    getSubPosts(@Param() params: any) {
        return this.postService.getSubPosts(params.id);
    }

    @ApiOperation({
        summary: 'Get all posts'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiBadRequestResponse({
        description: 'Bad request'
    })
    @Get()
    getPosts() {
        return this.postService.getPosts();
    }

}
