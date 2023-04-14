import { Model, Column, Table, DataType, ForeignKey } from 'sequelize-typescript'
import { Stock } from 'models/stock.model';
import { User } from 'models/user.model';
import { Wine } from 'models/wine.model';

@Table({
    tableName: 'User_Wine',
    timestamps: true,
    paranoid: true
})
export class User_Wine extends Model<User_Wine> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID })
    userId: string;

    @ForeignKey(() => Wine)
    @Column({ type: DataType.UUID })
    wineId: string;

    @ForeignKey(() => Stock)
    @Column({ type: DataType.UUID })
    stockId: string;

}