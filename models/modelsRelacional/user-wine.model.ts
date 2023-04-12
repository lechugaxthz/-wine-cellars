import { Model, Column, Table, Default, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'User_Wine',
    timestamps: true,
    paranoid: true
})
export class User_Wine extends Model<User_Wine> {

}