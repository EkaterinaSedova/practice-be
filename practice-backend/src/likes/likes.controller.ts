import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {LikesService} from "./likes.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateLikeDto} from "./dto/create-like.dto";
import {DeleteLikeDto} from "./dto/delete-like.dto";

@Controller('/likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    //создание лайка
    @UseGuards(JwtAuthGuard)
    @Post()
    createLike(@Body() dto: CreateLikeDto) {
        return this.likesService.createLike(dto);
    }

    //удаление лайка
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteLike(@Body() dto: DeleteLikeDto) {
        return this.likesService.deleteLike(dto.id);
    }

    //получение всех постов, которые лайкнул пользователь
    @UseGuards(JwtAuthGuard)
    @Get('/user')
    getLikesByUser(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByUser(dto.user_id);
    }

    //получение всех пользователей, которые лайкнули пост
    @UseGuards(JwtAuthGuard)
    @Get('/post')
    getLikesByPost(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByPost(dto.post_id);
    }

}
