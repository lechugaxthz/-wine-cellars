import { AlcoholContent } from "models/alcoholContent.model";
import { Category } from "models/category.model";
import { User_Wine } from "models/modelsRelacional/user-wine.model";
import { Stock } from "models/stock.model";
import { Type } from "models/type.model";
import { User } from "models/user.model";
import { Wine } from "models/wine.model";
import { WineCellar } from "models/wineCellar.model";

import * as dotenv from 'dotenv';

dotenv.config();


export const defaultForRoot: any = Object.freeze({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    /* models: [
        Wine,
        User,
        WineCellar,
        Type,
        Stock,
        Category,
        AlcoholContent,
        User_Wine
    ],
    autoLoadModels: true,
    login: false */
})