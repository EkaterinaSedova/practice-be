import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript"
import {User} from "../users/user.model";

interface PostCreationAttrs {
    content: string;
    user_id: number;
}

@Table({tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.STRING})
    content: string;
    //@Column({type: DataType.ARRAY(DataType.STRING), allowNull: true})
    //images: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @BelongsTo(() => User)
    author: User;
}