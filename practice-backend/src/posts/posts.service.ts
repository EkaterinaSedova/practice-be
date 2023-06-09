import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";
import {DeletePostDto} from "./dto/delete-post.dto";
import {response} from "express";
import {Like} from "../likes/like.model";
import {Comment} from "../comments/comment.model";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService,
                @InjectModel(Like) private likeRepository: typeof Like,
                @InjectModel(Comment) private commentRepository: typeof Comment,
    ) {}

    async createPost(dto: CreatePostDto, images: any[]) {
        let fileNames = [];
        for(let i = 0; i < images.length; i++)
        {
            fileNames.push(await this.fileService.createImage(images[i]));
        }
        const post = await this.postRepository.create({...dto, images: fileNames});
        return post;
    }

    async deletePost(id) {
        const post_id = id;
        const post = await this.postRepository.destroy({where: {id}});
        const likes = await this.likeRepository.destroy({where: {post_id}});
        const comments = await this.commentRepository.destroy({where: {post_id}});
        if(!post) throw new HttpException("Пост не найден", HttpStatus.BAD_REQUEST)
        return {message: "Пост удалён."};
    }

    async getPostsByUser(user_id) {
        const posts = await this.postRepository.findAll({where: {user_id}})
        return posts;
    }

}
