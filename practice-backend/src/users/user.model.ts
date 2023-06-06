import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript"
import {Post} from "../posts/post.model";

interface UserCreationAttrs {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

@Table({tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @Column({type: DataType.STRING, allowNull: false})
    firstname: string;
    @Column({type: DataType.STRING, allowNull: false})
    lastname: string;
    @Column({type: DataType.STRING, allowNull: true})
    sex: string;
    @Column({type: DataType.STRING, allowNull: true})
    profile_img: string;

    @HasMany(() => Post)
    posts: Post[];

}