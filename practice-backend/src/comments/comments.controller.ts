import {Body, Controller, Post} from '@nestjs/common';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comments.service";

@Controller('/comments')
export class CommentsController {

    constructor(private commentService: CommentsService) {
    }
    @Post()
    createComment(@Body() commentDto: CreateCommentDto) {
        return this.commentService.createComment(commentDto);
    }
}
