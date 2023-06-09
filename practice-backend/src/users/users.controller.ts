import {Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {ValidationPipe} from "../pipes/validation.pipe";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
    @UseInterceptors(FileInterceptor('profile_img'))
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/update')
    updateUser(@Body() userDto: UpdateUserDto,
               @UploadedFile() image) {
        return this.usersService.updateUser(userDto, image);
    }
}
