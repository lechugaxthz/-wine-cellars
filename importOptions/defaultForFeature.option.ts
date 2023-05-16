import { AlcoholContent } from "models/alcoholContent.model";
import { Category } from "models/category.model";
import { User_Wine } from "models/modelsRelacional/user-wine.model";
import { Stock } from "models/stock.model";
import { Type } from "models/type.model";
import { User } from "models/user.model";
import { Wine } from "models/wine.model";
import { WineCellar } from "models/wineCellar.model";

export const defaultForFeature: any = [
    Wine,
    User,
    WineCellar,
    Type,
    Stock,
    Category,
    AlcoholContent,
    User_Wine
]