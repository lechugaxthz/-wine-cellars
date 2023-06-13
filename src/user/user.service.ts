import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/userCreate.dto';
import * as bcrypt from 'bcrypt'
import { User } from 'models/user.model';
import { CompareUser } from './dto/userCompare.dto';
import { CreateUserGoogleDto } from './dto/userGoogle.dto';

@Injectable()
export class UserService {

    /* creación de usuario */
    async CreateUser(user: CreateUserDto): Promise<any[]> {
        user.password = await bcrypt.hash(user.password, 10);
        let newUser = await User.create(user);
        return [`Se creo el nuevo usuario ${newUser}`];
    };

    /* inicio de sesión. comparación de claves encriptada con la recibida y adición de JWT a su usuario */
    async CompareUser(user: CompareUser): Promise<any> {
        let thisUser = await User.findOne({ where: { email: user.email } })

        let compare: boolean | { token: string }

        thisUser
            ? compare = bcrypt.compareSync(user.password, thisUser.password)
            : compare = false
        return compare
            ? { id: thisUser.id, name: thisUser.name }
            : false
    }

    async FindGoogleUser(id: string): Promise<any> {
        let user = await User.findOne({ where: { id: id } })
        return user
            ? user
            : false
    }

    async CreateGoogleUser(user: CreateUserGoogleDto): Promise<any> {
        await User.create(user)
            .then(() => true)
    }

}
