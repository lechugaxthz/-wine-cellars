import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator'

export class QueryWineDto {

    @IsNotEmpty()
    @ApiProperty()
    page: number;

    @IsNotEmpty()
    @ApiProperty()
    limit: number;

    @IsOptional()
    @ApiProperty({ required: false })
    orderName?: 'ASC' | 'DESC' | ''

    @IsOptional()
    @ApiProperty({ required: false })
    orderStock?: 'ASC' | 'DESC' | ''

    @IsOptional()
    @ApiProperty({ required: false })
    orderAlcoholContent?: 'ASC' | 'DESC' | ''

    @IsOptional()
    @ApiProperty({ required: false })
    name?: string = ''

    @IsOptional()
    @ApiProperty({ required: false })
    stock?: boolean | string = ''

    @IsOptional()
    @ApiProperty({ required: false })
    categoryId?: string = ''

    @IsOptional()
    @ApiProperty({ required: false })
    typeId?: string = ''

    @IsOptional()
    @ApiProperty({ required: false })
    alcoholContent?: number | string = ''

    @IsOptional()
    @ApiProperty({ required: false })
    wineCellarId?: string = ''

}