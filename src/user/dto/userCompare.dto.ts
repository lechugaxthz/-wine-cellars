import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CompareUser {
    @IsNotEmpty()
    @IsString()
    @IsEmail(undefined, { message: 'Invalid email format' })
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

}