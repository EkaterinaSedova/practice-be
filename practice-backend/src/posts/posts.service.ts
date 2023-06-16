import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";
import {Like} from "../likes/like.model";
import {Comment} from "../comments/comment.model";
import {Subscription} from "../subscriptions/subscription.model";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService,
                @InjectModel(Like) private likeRepository: typeof Like,
                @InjectModel(Comment) private commentRepository: typeof Comment,
                @InjectModel(Subscription) private subscriptionRepository: typeof Subscription
    ) {}


    //создание поста
    async createPost(dto: CreatePostDto, images: any[]) {
        let fileNames = [];
        for(let i = 0; i < images.length; i++)
        {
            fileNames.push(await this.fileService.createImage(images[i]));
        }
        const post = await this.postRepository.create({...dto, images: fileNames});
        return post;
    }

    //удаление поста и всех относящихся к нему лайков и комментариев
    async deletePost(id) {
        const post_id = id;
        const post = await this.postRepository.destroy({where: {id}});
        const likes = await this.likeRepository.destroy({where: {post_id}});
        const comments = await this.commentRepository.destroy({where: {post_id}});
        if(!post) throw new HttpException("Пост не найден", HttpStatus.BAD_REQUEST)
        return {message: "Пост удалён."};
    }


    //получение всех постов пользователя
    async getPostsByUser(user_id) {
        const posts = await this.postRepository.findAll({where: {user_id}, order: [
                ['id', 'DESC']
            ]})
        return posts;
    }


    //обновление поста (ищем пост по id)
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

    //получение постов всех пользователей, на которых подписан конкретный пользователей
    async getSubPosts(subscriber_id) {
        const subscriptions = await this.subscriptionRepository.findAll({where: {subscriber_id}});
        let posts = [];
        for(let i = 0; i < subscriptions.length; i++) {
            const user_id = subscriptions[i].subscriber_to_id
            posts.push(await this.postRepository.findAll({where: {user_id}, order: [
                            ['id', 'DESC']
                        ]}))
        }
        return posts;
    }

    async getPosts() {
        const posts = await this.postRepository.findAll({order: [
            ['id', 'DESC']
            ]});
        return posts;
    }
}
