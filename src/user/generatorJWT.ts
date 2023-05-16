import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export function generateToken(payload: any): string {
    const secretKey = process.env.TOKEN_SECRET; // Clave secreta para firmar el JWT
    const expiresIn = '24h'; // Tiempo de expiración del JWT

    const token = jwt.sign(payload, secretKey, { expiresIn });

    return token;
}