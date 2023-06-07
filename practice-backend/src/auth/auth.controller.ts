import {Body, Controller, Post} from '@nestjs/common';
import {LoginUserDto} from "../users/dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {

    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
