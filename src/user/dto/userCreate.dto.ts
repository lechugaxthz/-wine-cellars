import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    local?: string

    @IsNotEmpty()
    @IsEmail(undefined, { message: 'Invalid email format' })
    email: string

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-zñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-zñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/, {
        message: 'Password must contain at least one letter, one number, one symbol, and have a minimum length of 8 characters'
    })
    password: string;

}