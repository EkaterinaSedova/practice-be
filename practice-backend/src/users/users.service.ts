import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FilesService} from "../files/files.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private fileService: FilesService
    ) {}
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async updateUser(dto: UpdateUserDto, image: any) {
        const id = dto.id;
        const fileName = await this.fileService.createImage(image)
        const candidate = await this.userRepository.findOne({where: {id}})
        if(!candidate) throw new HttpException("Пользователь не найден", HttpStatus.BAD_REQUEST)
        const firstName = dto.firstname || candidate.firstname;
        const lastName = dto.lastname || candidate.lastname;
        const sex = dto.sex || candidate.sex;
        const img = fileName || candidate.profile_img;
        const user = await this.userRepository.update(
            {
                firstname: firstName,
                lastname: lastName,
                sex: sex,
                profile_img: img,
            }, {
                where: {id}
            })
        return {message: "Данные о пользователе обновлены."};
    }
}
