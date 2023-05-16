import { HttpException, HttpStatus, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userCreate.dto';
import { CompareUser } from './dto/userCompare.dto';
import { generateToken } from './generatorJWT';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/')
    async create(@Body() user: CreateUserDto): Promise<string | any[]> {
        return this.userService.CreateUser(user)
    }

    @Post('/login')
    async loginCompare(@Body() user: CompareUser): Promise<{ token: string } | { message: string }> {
        let ress = await this.userService.CompareUser(user)
        
        if (ress) {
            let token = generateToken(ress)
            return { token }
        } else {
            throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED)
        }

    }
}
