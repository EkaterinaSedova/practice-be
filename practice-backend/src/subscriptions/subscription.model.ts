import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript"
import {User} from "../users/user.model";

interface SubscriptionCreationAttrs {
    subscriber_id: number;
    subscriber_to_id: number;
}

@Table({tableName: 'subscriptions', updatedAt: false})
export class Subscription extends Model<Subscription, SubscriptionCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    subscriber_id: number;

    @Column({type: DataType.INTEGER})
    subscriber_to_id: number;

    @BelongsTo(() => User)
    subscriber: User;
}