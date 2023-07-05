import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Like} from "./like.model";
import {CreateLikeDto} from "./dto/create-like.dto";

@Injectable()
export class LikesService {

    constructor(@InjectModel(Like) private likeRepository: typeof Like) {
    }

    //создание лайка
    async createLike(dto: CreateLikeDto) {
        const like = await this.likeRepository.create(dto);
        return like;
    }

    //удаление лайка
    async deleteLike(id) {
        const like = await this.likeRepository.destroy({where: {id}});
        return {message: "Удалено"};
    }

    //получение постов, которые лайкнул конкретный пользователь
    async getLikesByUser(user_id) {
        const likes = await this.likeRepository.findAll({where: {user_id}});
        return likes;
    }


    //получение всех пользователей, которые лайкнули конкретный пост
    async getLikesByPost(post_id) {
        const likes = await this.likeRepository.findAndCountAll({where: {post_id}});
        return likes;
    }

}
