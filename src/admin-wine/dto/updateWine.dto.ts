import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateWineDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    category?: string;

    @IsOptional()
    @IsArray()
    type?: string;

    @IsOptional()
    @IsString()
    alcoholContent?: string;

    @IsOptional()
    @IsNumber()
    stockId?: string;
    
    @IsOptional()
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsString()
    wineCellar?: string;

}