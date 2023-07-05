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

    //создание пользователя
    async createUser(dto: CreateUserDto) {
        const noAvatar = 'no_avatar_image.jpg';
        const user = await this.userRepository.create({...dto, sex: 'unknown', profile_img: noAvatar});
        return user;
    }

    //получение массива всех пользователей
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }

    //получение пользователя по email
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    //обновление данных о пользователе (кроме email и password)
    async updateUser(dto: UpdateUserDto, image: any) {
        const id = dto.id;
        let fileName;
        if (image) fileName = await this.fileService.createImage(image)
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

    //удаление пользователя
    async deleteUser(id) {
        const user = await this.userRepository.destroy({where: {id}})
        return {message: `Пользователь с id ${id} удалён`}
    }

    async getUserById(id) {
        const user = await this.userRepository.findOne({where: {id}, include: {all: true}})
        return user;
    }
}
