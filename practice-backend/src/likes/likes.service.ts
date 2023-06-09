import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Like} from "./like.model";
import {CreateLikeDto} from "./dto/create-like.dto";

@Injectable()
export class LikesService {

    constructor(@InjectModel(Like) private likeRepository: typeof Like) {
    }

    async createLike(dto: CreateLikeDto) {
        const like = await this.likeRepository.create(dto);
        return like;
    }

    async deleteLike(id) {
        const like = await this.likeRepository.destroy({where: {id}});
        return {message: "Удалено"};
    }

    async getLikesByUser(user_id) {
        const likes = await this.likeRepository.findAll({where: {user_id}});
        return likes;
    }

    async getLikesByPost(post_id) {
        const likes = await this.likeRepository.findAll({where: {post_id}});
        return likes;
    }

}
