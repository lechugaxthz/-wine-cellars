import { IsNotEmpty, IsObject } from 'class-validator'
import { Op } from 'sequelize'

export class whereSchemaDto {

    @IsNotEmpty()
    @IsObject()
    where: object

}