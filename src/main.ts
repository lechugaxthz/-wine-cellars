import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

/* modelos Tablas */
import { User } from 'models/user.model';
import { Wine } from 'models/wine.model';
import { User_Wine } from 'models/modelsRelacional/user-wine.model';
import { WineCellar } from 'models/wineCellar.model';
import { Category } from 'models/category.model';
import { Type } from 'models/type.model';
import { Stock } from 'models/stock.model';
import { AlcoholContent } from 'models/alcoholContent.model';


dotenv.config();

async function bootstrap() {
  let port = process.env.PORT || 3000

  const app = await NestFactory.create(AppModule);
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    models: [User, Wine, User_Wine, WineCellar, Category, Type, Stock, AlcoholContent],
    logging: false
  })
  sequelize
    .authenticate()
    .then(() => {
      sequelize.sync({ force: true })
        .then(() => console.log('Connection has been established successfully.'))
    })
    .then(() => {
      console.log('Tables created successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  await app.listen(port, "0.0.0.0", () => console.log(`http://localhost:${port}`));
}
bootstrap();

