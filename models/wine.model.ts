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

    @Column({
        type: DataType.UUID,
    })
    categoryId: string

    setCategory(category: Category): Promise<void> {
        this.categoryId = category.id;
        this.category = category;
        return
    }

    @BelongsTo(() => Type, 'typeId')
    type: Type;

    @Column({
        type: DataType.UUID,
    })
    typeId: string;

    setType(type: Type): Promise<void> {
        this.typeId = type.id;
        this.type = type;
        return
    }

    @BelongsTo(() => AlcoholContent, 'alcoholContentId')
    alcoholContent: AlcoholContent;

    @Column({
        type: DataType.UUID,
    })
    alcoholContentId: string;

    setAlcoholContent(alcoholContent: AlcoholContent): Promise<void> {
        this.alcoholContentId = alcoholContent.id;
        this.alcoholContent = alcoholContent;
        return
    }

    @BelongsTo(() => Stock, 'stockId')
    stock: Stock;

    @Column({
        type: DataType.UUID,
    })
    stockId: string;

    setStock(stock: Stock): Promise<void> {
        this.stockId = stock.id;
        this.stock = stock;
        return
    }

    @BelongsTo(() => WineCellar, 'wineCellarId')
    wineCellar: WineCellar;

    @Column({
        type: DataType.UUID,
    })
    wineCellarId: string;

    setWineCellar(wineCellar: WineCellar): Promise<void> {
        this.wineCellarId = wineCellar.id;
        this.wineCellar = wineCellar;
        return
    }

    @BelongsToMany(() => User, () => User_Wine)
    user: User[];

    addUser(user: User): Promise<User_Wine> {
        return User_Wine.create({ userId: user.id, wineId: this.id });
    }

}