import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript"
import {User} from "../users/user.model";
import {Post} from "../posts/post.model";

interface LikeCreationAttrs {
}

@Table({tableName: 'likes', createdAt: false, updatedAt: false})
export class Like extends Model<Like, LikeCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    post_id: number;

    @BelongsTo(() => User)
    liked_user: User;

    @BelongsTo(() => Post)
    liked_post: Post;
}