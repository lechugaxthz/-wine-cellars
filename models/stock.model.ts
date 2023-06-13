import { Model, Column, Table, DataType, HasMany, HasOne } from 'sequelize-typescript'
import { Wine } from './wine.model';

@Table({
    tableName: 'Stock',
    underscored: true,
    timestamps: true,
    paranoid: true
})
export class Stock extends Model<Stock> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    value: number;

    @HasOne(() => Wine, 'wineId')
    wine: Wine[];

}