import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {FilesService} from "../files/files.service";
import {DeletePostDto} from "./dto/delete-post.dto";
import {response} from "express";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService
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
        const post = await this.postRepository.destroy({where: {id}})
        if(!post) throw new HttpException("Пост не найден", HttpStatus.BAD_REQUEST)
        return id;
    }

}
