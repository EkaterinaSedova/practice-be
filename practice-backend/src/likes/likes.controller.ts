import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {LikesService} from "./likes.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateLikeDto} from "./dto/create-like.dto";
import {DeleteLikeDto} from "./dto/delete-like.dto";

@UseGuards(JwtAuthGuard)
@Controller('/likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    //создание лайка
    @Post()
    createLike(@Body() dto: CreateLikeDto) {
        return this.likesService.createLike(dto);
    }

    //удаление лайка
    @Delete()
    deleteLike(@Body() dto: DeleteLikeDto) {
        return this.likesService.deleteLike(dto.id);
    }

    //получение всех постов, которые лайкнул пользователь
    @Get('/user')
    getLikesByUser(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByUser(dto.user_id);
    }

    //получение всех пользователей, которые лайкнули пост
    @Get('/post')
    getLikesByPost(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByPost(dto.post_id);
    }

}
