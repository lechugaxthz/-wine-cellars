import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript'
import { Wine } from './wine.model';

@Table({
    tableName: 'AlcoholContent',
    underscored: true,
    timestamps: true,
    paranoid: true
})
export class AlcoholContent extends Model<AlcoholContent> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    alcohol: number;

    @HasMany(() => Wine, 'wineId')
    wine: Wine[];

}