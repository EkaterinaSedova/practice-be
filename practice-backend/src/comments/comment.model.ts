import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript"
import {User} from "../users/user.model";
import {Post} from "../posts/post.model";
interface CommentCreationAttrs {
    user_id: number;
    post_id: number;
    content: string;
}

@Table({tableName: 'comments', updatedAt: false})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number;

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER})
    post_id: number;

    @Column({type: DataType.STRING})
    content: string;

    @BelongsTo(() => User)
    comment_author: User;

    @BelongsTo(() => Post)
    commented_post: Post;
}