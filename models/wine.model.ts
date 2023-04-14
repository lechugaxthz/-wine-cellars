import { Model, Column, Table, DataType, BelongsToMany, BelongsTo } from 'sequelize-typescript'
import { User_Wine } from './modelsRelacional/user-wine.model';
import { User } from './user.model';
import { Stock } from './stock.model';
import { Type } from './type.model';
import { Category } from './category.model';
import { AlcoholContent } from './alcoholContent.model';
import { WineCellar } from './wineCellar.model';

@Table({
    tableName: 'Wine',
    underscored: true,
    timestamps: true,
    paranoid: true
})
export class Wine extends Model<Wine> {
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
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @BelongsTo(() => Category, 'categoryId')
    category: Category;

    @BelongsTo(() => Type, 'typeId')
    type: Type;

    @BelongsTo(() => AlcoholContent, 'alcoholContentId')
    alcoholContent: AlcoholContent;

    @BelongsTo(() => Stock, 'stockId')
    stock: Stock;

    @BelongsTo(() => WineCellar, 'wineCellarId')
    wineCellar: WineCellar;

    @BelongsToMany(() => User, () => User_Wine)
    user: User[];


}