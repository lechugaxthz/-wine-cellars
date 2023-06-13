import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString } from 'class-validator'

@Exclude()
export class GetWineDto {

    @Expose()
    @IsString()
    id: string;

    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsString()
    description: string;

    @Expose()
    @IsObject()
    category: {
        id: string,
        category: string
    }

    @Expose()
    @IsObject()
    type: {
        id: string,
        type: string
    }

    @Expose()
    @IsObject()
    alcoholContent: {
        id: string,
        alcohol: string
    }

    @Expose()
    @IsObject()
    stock: {
        id: string,
        value: string
    }

    @Expose()
    @IsObject()
    wineCellar: {
        id: string,
        name: string
    }

}