import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiOperation } from '@nestjs/swagger';
import { Op } from 'sequelize';

/* dto */
import { GetWineDto } from './dto/getWine.dto';
import { QueryWineDto } from './dto/queryWine.dto';

/* modelos */
import { AlcoholContent } from 'models/alcoholContent.model';
import { WineCellar } from 'models/wineCellar.model';
import { Category } from 'models/category.model';
import { Type } from 'models/type.model';
import { Wine } from 'models/wine.model';
import { Stock } from 'models/stock.model';


/* schema */

@Injectable()
export class WineService {
    constructor(
        /* tablas. posiblemente las saque de este modelo. */
        @InjectModel(AlcoholContent) private readonly alcoholContentModel: typeof AlcoholContent,
        @InjectModel(WineCellar) private readonly wineCellarModel: typeof WineCellar,
        @InjectModel(Category) private readonly categoryModel: typeof Category,
        @InjectModel(Stock) private readonly stockModel: typeof Stock,
        @InjectModel(Wine) private readonly wineModel: typeof Wine,
        @InjectModel(Type) private readonly typeModel: typeof Type
    ) { }


    @ApiOperation({
        description: 'Obtiene todos los vinos disponibles hasta el momento. A ver: si agregar o no aquellos vinos con stock = 0'
    })
    async GetAllWines(queryWine: QueryWineDto): Promise<any | GetWineDto[]> {
        let { page, limit, orderName, orderStock, orderAlcoholContent, name, stock, categoryId, typeId, alcoholContent, wineCellarId, } = queryWine
        try {
            /* saltos */
            let offset = (page - 1) * limit;

            /* variables a modificar */
            let whereWine = { id: { [Op.not]: null } },
                whereAlcoholContent = { id: { [Op.not]: null } },
                whereStock = { id: { [Op.not]: null } },
                whereWineCellar: any = {},
                whereCategory: any = {},
                whereType: any = {},
                order = []

            /* consulpa por metodo de ordenamiento */
            if (orderName !== '') {
                order.push(['name', orderName]);
            } else if (orderStock !== '') {
                order.push(['stock', 'value', orderStock]);
            } else if (orderAlcoholContent !== '') {
                order.push(['alcoholContent', 'alcohol', orderAlcoholContent]);
            }

            /* consulta por filtrado */
            name !== ''
                ? whereWine['name'] = { [Op.iLike]: `%${name}%` }
                : whereWine
            stock !== ''
                ? whereStock['value'] = { [Op.lte]: `%${stock}%` }
                : whereStock
            alcoholContent
                ? whereAlcoholContent['alcohol'] = { [Op.eq]: `%${alcoholContent}%` }
                : whereAlcoholContent
            categoryId !== ''
                ? whereCategory.id = { [Op.eq]: `${categoryId}` }
                : whereCategory.id = { [Op.not]: null }
            typeId !== ''
                ? whereType.id = { [Op.eq]: `${typeId}` }
                : whereType.id = { [Op.not]: null }
            wineCellarId !== ''
                ? whereWineCellar.id = { [Op.eq]: `${wineCellarId}` }
                : whereWineCellar.id = { [Op.not]: null }

            /* consulta a tabla Wine */
            let { count, rows } = await Wine.findAndCountAll({
                offset,
                limit,
                order,
                where: whereWine,
                attributes: ['id', 'name', 'description'],
                include: [
                    { model: WineCellar, attributes: ['id', 'name'], where: whereWineCellar },
                    { model: AlcoholContent, attributes: ['id', 'alcohol'], where: whereAlcoholContent },
                    { model: Category, attributes: ['id', 'category'], where: whereCategory },
                    { model: Type, attributes: ['id', 'type'], where: whereType },
                    { model: Stock, attributes: ['id', 'value'], where: whereStock }
                ],
            })

            if (!rows.length) {
                throw new BadRequestException()
            } else {
                /* re-formateado de valores de rows */
                let AllWinesDto: GetWineDto[] = rows.map(wine => plainToClass(GetWineDto, wine))

                return {
                    data: AllWinesDto,
                    currentPage: Number(page),
                    totalPages: Math.ceil(count / limit),
                    totalResults: count
                }
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException('No se encuentran coincidencias con los filtros usados')
            } else {
                throw new InternalServerErrorException('Algo anda mal. Intenta más tarde')
            }
        }
    }

}
