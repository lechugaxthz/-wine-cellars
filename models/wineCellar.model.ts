import { Model, Column, Table, Default, AllowNull, DataType } from 'sequelize-typescript'

@Table({ tableName: 'WineCellars' })
export class WineCellar extends Model<WineCellar> {
    @Column(DataType.UUID)
    @AllowNull(false)
    @Default(DataType.UUIDV4)
    id: typeof DataType.UUID;

    

}