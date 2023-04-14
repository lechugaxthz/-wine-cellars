import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript'
import { Wine } from './wine.model';

@Table({
    tableName: 'Type',
    underscored: true,
    timestamps: true,
    paranoid: true
})
export class Type extends Model<Type> {
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
    type: string;

    @HasMany(() => Wine, 'wineId')
    wine: Wine[];

}