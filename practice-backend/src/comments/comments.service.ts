import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Comment} from "../comments/comment.model";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CreatePostDto} from "../posts/dto/create-post.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {
    }

    //создание комментария
    async createComment(commentDto: CreateCommentDto) {
        const comment = await this.commentRepository.create(commentDto);
        return comment;
    }

    //удаление комментария
    async deleteComment(id) {
        const comment = await this.commentRepository.destroy({where: {id}})
        if(!comment) throw new HttpException("Комментарий не найден", HttpStatus.BAD_REQUEST)
        return {message: "Комментарий удалён"};
    }

    //обновления содержимого комментария
    async updateComment(dto: UpdateCommentDto) {
        const content = dto.content;
        const id = dto.id;
        const comment = await this.commentRepository.update({content: content}, {where: {id}})
        return {message: "Комментарий обновлён"};
    }

    //получение всех комментариев к конкретному посту
    async getCommentsByPost(post_id) {
        const comments = await this.commentRepository.findAll({where: {post_id}})
        return comments;
    }
}
