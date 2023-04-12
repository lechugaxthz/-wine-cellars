import { Model, Column, Table, Default, AllowNull, DataType, BelongsToMany } from 'sequelize-typescript'
import { Wine } from './wine.model';
import { User_Wine } from './modelsRelacional/user-wine.model';

@Table({
    tableName: 'Users',
    timestamps: true,
    paranoid: true
})
export class User extends Model<User> {
    @Column(DataType.UUID)
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    id: typeof DataType.UUID;

    @Column(DataType.STRING)
    @AllowNull(false)
    name: string;

    @Column(DataType.STRING)
    @AllowNull(false)
    @Default(null)
    local: string | null;

    @Column(DataType.STRING)
    @AllowNull(false)
    email: string

    @Column(DataType.STRING)
    @AllowNull(false)
    password: string

    @BelongsToMany(() => Wine, () => User_Wine)
    Wines: Wine[]
}