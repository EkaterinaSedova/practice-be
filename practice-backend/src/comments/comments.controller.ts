import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comments.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteCommentDto} from "./dto/delete-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@Controller('/comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    createComment(@Body() commentDto: CreateCommentDto) {
        return this.commentService.createComment(commentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteComment(@Body() commentDto: DeleteCommentDto) {
        return this.commentService.deleteComment(commentDto.comment_id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCommentsByPost(@Body() commentDto: CreateCommentDto) {
        return this.commentService.getCommentsByPost(commentDto.post_id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    updateComment (@Body() dto: UpdateCommentDto) {
        return this.commentService.updateComment(dto);
    }
}
