import { Model, Column, Table, DataType, BelongsToMany } from 'sequelize-typescript'
import { User_Wine } from './modelsRelacional/user-wine.model';
import { Wine } from './wine.model';

@Table({
    tableName: 'Users',
    underscored: true,
    timestamps: true,
    paranoid: true
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: 'null'
    })
    local: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'locale'
    })
    typeLogin: string

    @BelongsToMany(() => Wine, () => User_Wine)
    wines: Wine[];
}