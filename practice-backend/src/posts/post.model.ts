import {Column, DataType, Model, Table} from "sequelize-typescript"

interface PostCreationAttrs {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

@Table({tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    content: string;
    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    images: string;
}