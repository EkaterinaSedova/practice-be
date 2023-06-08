import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "../comments/comment.model";
import {CreateCommentDto} from "./dto/create-comment.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {
    }

    async createComment(commentDto: CreateCommentDto) {
        const comment = await this.commentRepository.create(commentDto);
        return comment;
    }
}
