import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";
import {DeletePostDto} from "./dto/delete-post.dto";
import {response} from "express";
import {Like} from "../likes/like.model";
import {Comment} from "../comments/comment.model";
import {UpdatePostDto} from "./dto/update-post.dto";

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

    async updatePost(dto: UpdatePostDto, files: any[]) {
        const id = dto.id;

        let fileNames = [];
        for(let i = 0; i < files.length; i++)
        {
            fileNames.push(await this.fileService.createImage(files[i]));
        }

        const candidate = await this.postRepository.findOne({where: {id}})

        const content = dto.content || candidate.content;
        const images = fileNames || candidate.images;

        const post = await this.postRepository.update({
            content: content,
            images: images
        }, {where: {id}})
        return {message: "Пост обновлён"}
    }

}
