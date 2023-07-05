import {Body, Controller, Delete, Get, Post, UseGuards} from '@nestjs/common';
import {LikesService} from "./likes.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateLikeDto} from "./dto/create-like.dto";
import {DeleteLikeDto} from "./dto/delete-like.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";

@ApiTags('Like')
@ApiBearerAuth('access-token')
@ApiUnauthorizedResponse({
    description: 'Unauthorized user'
})
@UseGuards(JwtAuthGuard)
@Controller('/likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    //создание лайка
    @ApiOperation({
        summary: 'Create like'
    })
    @ApiCreatedResponse({
        description: 'Successfully created'
    })
    @Post()
    createLike(@Body() dto: CreateLikeDto) {
        return this.likesService.createLike(dto);
    }

    //удаление лайка
    @ApiOperation({
        summary: 'Delete like'
    })
    @ApiOkResponse({
        description: 'Successfully deleted'
    })
    @Delete()
    deleteLike(@Body() dto: DeleteLikeDto) {
        return this.likesService.deleteLike(dto.id);
    }

    //получение всех постов, которые лайкнул пользователь
    @ApiOperation({
        summary: 'Get likes by user'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @Get('/user')
    getLikesByUser(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByUser(dto.user_id);
    }

    //получение всех пользователей, которые лайкнули пост
    @ApiOperation({
        summary: 'Get likes by post'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @Get('/post')
    getLikesByPost(@Body() dto: CreateLikeDto) {
        return this.likesService.getLikesByPost(dto.post_id);
    }

}
