import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiCreatedResponse,
    ApiHeader,
    ApiOkResponse,
    ApiOperation, ApiParam,
    ApiResponse, ApiTags
} from "@nestjs/swagger";
import {User} from "./user.model";

@ApiTags('User')
@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    //создание пользователя
    @ApiOperation({summary: 'Create user'})
    @ApiCreatedResponse({type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    //получение массива всех пользователей


    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    getAll() {
        return this.usersService.getAllUsers();
    }

    //обновление данных о пользователе
    @ApiOperation({
        summary: 'Update user'
    })
    @ApiCreatedResponse({
        description: 'Successfully updated'
    })
    @UseInterceptors(FileInterceptor('profile_img'))
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @ApiConsumes('multipart/form-data')
    @Post('/update')
    updateUser(@Body() userDto: UpdateUserDto,
               @UploadedFile() image) {
        return this.usersService.updateUser(userDto, image);
    }

    //удаление пользователя
    @ApiOperation({
        summary: 'Update user'
    })
    @ApiOkResponse({
        description: 'Successfully deleted'
    })
    @Delete()
    deleteUser(@Body() dto: UpdateUserDto) {
        return this.usersService.deleteUser(dto.id);
    }

    @ApiOperation({
        summary: 'Get user by ID'
    })
    @ApiOkResponse({
        description: 'Success'
    })
    @ApiBadRequestResponse({
        description: 'Bad request: user not found'
    })
    @ApiParam({
        name: 'id',
        description: 'Gets the user id',
    })
    @Get('/:id')
    getUserById(@Param() params: any) {
        return this.usersService.getUserById(params.id);
    }

}
