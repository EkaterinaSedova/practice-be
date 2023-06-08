import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
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

    async deleteComment(id) {
        const comment = await this.commentRepository.destroy({where: {id}})
        if(!comment) throw new HttpException("Комментарий не найден", HttpStatus.BAD_REQUEST)
        return id;
    }

    async getCommentsByPost(post_id) {
        const comments = await this.commentRepository.findAll({where: {post_id}})
        return comments;
    }
}
