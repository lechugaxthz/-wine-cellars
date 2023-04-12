import { Model, Column, Table, Default, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'Wine_Category',
    timestamps: true,
    paranoid: true
})
export class Wine_Category extends Model<Wine_Category> {

}