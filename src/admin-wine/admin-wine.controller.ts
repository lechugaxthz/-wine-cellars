import { Controller, Post, Body, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { AdminWineService } from './admin-wine.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { PostWineDto } from '../admin-wine/dto/postWine.dto';
import { UpdateWineDto } from './dto/updateWine.dto';


@Controller('admin-wine')
export class AdminWineController {
    constructor(private readonly adminService: AdminWineService) { }

    @Post('/newWine')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({
        type: PostWineDto
    })
    @ApiOperation({
        description: 'Con lo mandado por body, se creará el nuevo vino.'
    })
    async postWine(@Body() wine: PostWineDto): Promise<any | any[]> {
        return this.adminService.PostNewWine(wine)
    }

    @Put('update')
    @HttpCode(HttpStatus.ACCEPTED)
    async updateWine(@Body() Wine: UpdateWineDto): Promise<any | any[]> {
        
    }
}
