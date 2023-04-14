import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript'
import { Wine } from './wine.model';

@Table({
    tableName: 'Category',
    underscored: true,
    timestamps: true,
    paranoid: true
})
export class Category extends Model<Category> {
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
    category: string;

    @HasMany(() => Wine, 'wineId')
    wine: Wine[];

}