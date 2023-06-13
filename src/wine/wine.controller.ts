import { Controller, Post, Get, Put, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { WineService } from './wine.service';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger'
import { QueryWineDto } from './dto/queryWine.dto';
import { GetWineDto } from './dto/getWine.dto';


@Controller('wine')
export class WineController {
    constructor(private readonly wineService: WineService) { }


    @Get(':decir')
    @ApiParam({
        name: 'decir',
        description: 'algo para decir',
        type: 'string',
        example: 'Mundo'
    })
    async hola(@Param() decir: string): Promise<any> {
        return `hola ${decir}`
    }


    @Get('/')
    @HttpCode(HttpStatus.ACCEPTED)
    /* @ApiQuery({ name: 'wine', required: true, type: QueryWineDto }) */
    @ApiResponse({ status: 201, description: 'devuelve todos los vinos' })
    async getAllWines(@Query() queryWine: QueryWineDto): Promise<any | GetWineDto[]> {
        return this.wineService.GetAllWines(queryWine)
    }

}
