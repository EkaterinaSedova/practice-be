import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {LikesService} from "./likes.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateLikeDto} from "./dto/create-like.dto";
import {DeleteLikeDto} from "./dto/delete-like.dto";

@Controller('/likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createLike(@Body() dto: CreateLikeDto) {
        return this.likesService.createLike(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteLike(@Body() dto: DeleteLikeDto) {
        return this.likesService.deleteLike(dto.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/user')
    getLikesByUser(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByUser(dto.user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/post')
    getLikesByPost(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByPost(dto.post_id);
    }

}
