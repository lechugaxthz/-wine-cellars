import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

/* modelos */
import { AlcoholContent } from 'models/alcoholContent.model';
import { WineCellar } from 'models/wineCellar.model';
import { Category } from 'models/category.model';
import { Type } from 'models/type.model';
import { Wine } from 'models/wine.model';
import { Stock } from 'models/stock.model';
import { ApiOperation } from '@nestjs/swagger';
import { PostWineDto } from './dto/postWine.dto';
import { UpdateWineDto } from './dto/updateWine.dto';

@Injectable()
export class AdminWineService {
    constructor(
        /* tablas */
        @InjectModel(AlcoholContent) private readonly alcoholContentModel: typeof AlcoholContent,
        @InjectModel(WineCellar) private readonly wineCellarModel: typeof WineCellar,
        @InjectModel(Category) private readonly categoryModel: typeof Category,
        @InjectModel(Stock) private readonly stockModel: typeof Stock,
        @InjectModel(Wine) private readonly wineModel: typeof Wine,
        @InjectModel(Type) private readonly typeModel: typeof Type
    ) { }

    @ApiOperation({
        description: 'Creación de un vino con sus respectivos valores de Alcohol, categorya, tipo, bodega y stock inicial. Tendria que modificar algunos valores pero ya de las tablas.'
    })
    async PostNewWine(wine: PostWineDto): Promise<any | any[] | { any: any }> {
        try {
            /* busqueda en los modelos de los respectivos valores que se le pondrán al vino */
            let alcoholContent = await this.alcoholContentModel.findByPk(wine.alcoholContent);
            let wineCellar = await this.wineCellarModel.findByPk(wine.wineCellar);
            let category = await this.categoryModel.findByPk(wine.category)
            let type = await this.typeModel.findByPk(wine.type);

            /* creación del vino */
            let newWine = await this.wineModel.create({
                name: wine.name,
                description: wine.description
            });

            /* creación del stock del vino */
            let stock = await this.stockModel.create({ value: wine.stock })

            /* aplicación de cada uno de los valores de relación */
            await newWine.setAlcoholContent(alcoholContent)
            await newWine.setWineCellar(wineCellar)
            await newWine.setCategory(category)
            await newWine.setStock(stock)
            await newWine.setType(type)

            await newWine.save();

            return 'Nuevo Vino subido con éxito'
        } catch (error) {
            throw new Error(error)
        }
    }


    @ApiOperation({
        description: ''
    })
    async UpdateWine(wine: UpdateWineDto): Promise<any | any[]> {

        try {
            let thisWine = await this.wineModel.findByPk(wine.id)

           /*  if (!thisWine.length) {
                
            } */

            if (wine.name !== '') {
                await thisWine.update({ name: wine.name })
            }
            if (wine.description !== '') {
                await thisWine.update({ description: wine.description })
            }
            if (wine.category !== '') {
                let thisCategory = await this.categoryModel.findByPk(wine.category)
                await thisWine.setCategory(thisCategory)
            }
            if (wine.type !== '') {
                let thisType = await this.typeModel.findByPk(wine.type)
                await thisWine.setType(thisType)
            }
            if (wine.alcoholContent !== '') {
                let thisAlcoholContent = await this.alcoholContentModel.findByPk(wine.alcoholContent)
                await thisWine.setAlcoholContent(thisAlcoholContent)
            }
            if (wine.stockId !== '') {
                let thisStock = await this.stockModel.findByPk(wine.stockId)
                await thisStock.update({ value: wine.stock })
            }
            if (wine.wineCellar !== '') {
                let thisWineCellar = await this.wineCellarModel.findByPk(wine.wineCellar)
                await thisWine.setWineCellar(thisWineCellar)
            }

            await thisWine.save()

            return 'Vino Actualizado!'

        } catch (error) {
            throw new Error(error)
        }
    }

}
