import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comments.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteCommentDto} from "./dto/delete-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation, ApiParam,
    ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Comment')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('/comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {
    }

    //создание комментария
    @ApiOperation({
        summary: 'Create comment'
    })
    @ApiCreatedResponse({
        description: 'Successfully created'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized user'
    })
    @Post()
    createComment(@Body() commentDto: CreateCommentDto) {
        return this.commentService.createComment(commentDto);
    }

    //удаление комментария
    @ApiOperation({
        summary: 'Delete comment'
    })
    @ApiOkResponse({
        description: 'Successfully deleted'
    })
    @ApiBadRequestResponse({
        description: 'Bad request: comment not found'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized user'
    })
    @Delete()
    deleteComment(@Body() commentDto: DeleteCommentDto) {
        return this.commentService.deleteComment(commentDto.comment_id)
    }


    //получение всех комментариев к конкретному посту
    @ApiOperation({
        summary: 'Get comments by post'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized user'
    })
    @ApiParam({
        name: 'id',
        description: 'Gets the post id',
    })
    @Get('/:id')
    getCommentsByPost(@Param() params: any) {
        return this.commentService.getCommentsByPost(params.id);
    }


    //обновление содержимого комментария
    @ApiOperation({
        summary: 'Update comment'
    })
    @ApiCreatedResponse({
        description: 'Successfully updated'
    })
    @ApiBadRequestResponse({
        description: 'Bad request: comment not found'
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized user'
    })
    @Post('/update')

    updateComment (@Body() dto: UpdateCommentDto) {
        return this.commentService.updateComment(dto);
    }
}
