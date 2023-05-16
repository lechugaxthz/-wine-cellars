import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserGoogleDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    email: string
}