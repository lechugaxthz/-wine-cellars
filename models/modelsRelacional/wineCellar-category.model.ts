import { Model, Column, Table, Default, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'WineCellar_Category',
    timestamps: true,
    paranoid: true
})
export class WineCellar_Category extends Model<WineCellar_Category> {

}