import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comments.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteCommentDto} from "./dto/delete-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@UseGuards(JwtAuthGuard)
@Controller('/comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {
    }

    //создание комментария
    @Post()
    createComment(@Body() commentDto: CreateCommentDto) {
        return this.commentService.createComment(commentDto);
    }

    //удаление комментария
    @Delete()
    deleteComment(@Body() commentDto: DeleteCommentDto) {
        return this.commentService.deleteComment(commentDto.comment_id)
    }


    //получение всех комментариев к конкретному посту
    @Get()
    getCommentsByPost(@Body() commentDto: CreateCommentDto) {
        return this.commentService.getCommentsByPost(commentDto.post_id);
    }


    //обновление содержимого комментария
    @Post('/update')
    updateComment (@Body() dto: UpdateCommentDto) {
        return this.commentService.updateComment(dto);
    }
}
