import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Sequelize } from 'sequelize-typescript';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import bodyParser from 'body-parser';

/* swagger */
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/* auth */
/* import { LocalStrategy } from './auth/strategy/local.strategy';
import { GoogleStrategy } from './auth/strategy/google.strategy'; */

import session from 'express-session';
import passport from 'passport'
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as Promise from 'bluebird';
Promise.config({
  warnings: false,
  longStackTraces: true,
  cancellation: true,
  monitoring: true
});

global.PromiseConstructor = Promise;

/* modelos Tablas */
import { User } from 'models/user.model';
import { Wine } from 'models/wine.model';
import { User_Wine } from 'models/modelsRelacional/user-wine.model';
import { WineCellar } from 'models/wineCellar.model';
import { Category } from 'models/category.model';
import { Type } from 'models/type.model';
import { Stock } from 'models/stock.model';
import { AlcoholContent } from 'models/alcoholContent.model';
import { where } from 'sequelize';




dotenv.config();

async function bootstrap() {

  let port = process.env.PORT || 3000

  /* configuración de DB */

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
    .then(async () => {
      await sequelize.sync({ force: false, alter: true })
        .then(() => console.log('Connection has been established successfully.'))
    })
    .then(() => {
      console.log('Tables created successfully.');
    })
    /* modelos de prueba para las tablas */
    /* .then(async () => {
      let categorias_vinos = [{ category: "Tinto" }, { category: "Blanco" }, { category: "Rosado" }, { category: "Espumoso" }, { category: "Dulce" }]

      let tipos_vinos = [{ type: "Cabernet Sauvignon" }, { type: "Merlot" }, { type: "Pinot Noir" }, { type: "Chardonnay" }, { type: "Sauvignon Blanc" }, { type: "Syrah" }, { type: "Grenache" }, { type: "Tempranillo" }]

      let bodegas_vinos = [{ name: "Bodegas Torres" }, { name: "Viña Concha y Toro" }, { name: "Bodegas Vega Sicilia" }, { name: "Bodegas Emilio Moro" }, { name: "Bodegas Marqués de Riscal" }]

      let alcohol_Content = [{ alcohol: 9.0 }, { alcohol: 9.5 }, { alcohol: 10.0 }, { alcohol: 10.5 }, { alcohol: 11.0 }, { alcohol: 11.5 }, { alcohol: 12.0 }, { alcohol: 12.5 }, { alcohol: 13.0 }, { alcohol: 13.5 }, { alcohol: 14.0 }, { alcohol: 14.5 }, { alcohol: 15.0 }, { alcohol: 15.5 }, { alcohol: 16.0 }, { alcohol: 16.5 }, { alcohol: 17.0 }, { alcohol: 17.5 }, { alcohol: 18.0 }, { alcohol: 18.5 }, { alcohol: 19.0 }, { alcohol: 19.5 }, { alcohol: 20.0 }, { alcohol: 20.5 }, { alcohol: 21.0 }, { alcohol: 21.5 }, { alcohol: 22.0 }, { alcohol: 22.5 }, { alcohol: 23.0 }, { alcohol: 23.5 }, { alcohol: 24.0 }, { alcohol: 24.5 }, { alcohol: 25.0 }]


      await Category.bulkCreate(categorias_vinos)

      await Type.bulkCreate(tipos_vinos)

      await WineCellar.bulkCreate(bodegas_vinos)

      await AlcoholContent.bulkCreate(alcohol_Content)
    }) */

    /* creación de vinos para prueba */
    /* .then(async () => {
      let categorias_vinos = ["Tinto", "Blanco", "Rosado", "Espumoso", "Dulce"];
      let tipos_vinos = ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Chardonnay", "Sauvignon Blanc", "Syrah", "Grenache", "Tempranillo"];
      let bodegas_vinos = ["Bodegas Torres", "Viña Concha y Toro", "Bodegas Vega Sicilia", "Bodegas Emilio Moro", "Bodegas Marqués de Riscal"];
      let alcohol_Content = [9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0, 17.5, 18.0, 18.5, 19.0, 19.5, 20.0, 20.5, 21.0, 21.5, 22.0, 22.5, 23.0, 23.5, 24.0, 24.5, 25.0];

      for (let i = 0; i < 60; i++) {

        busco los entre los creados
        let alcoholContent = await AlcoholContent.findOne({ where: { alcohol: alcohol_Content[Math.floor(Math.random() * alcohol_Content.length)] } })
        let wineCellar = await WineCellar.findOne({ where: { name: bodegas_vinos[Math.floor(Math.random() * bodegas_vinos.length)] } });
        let category = await Category.findOne({ where: { category: categorias_vinos[Math.floor(Math.random() * categorias_vinos.length)] } });
        let type = await Type.findOne({ where: { type: tipos_vinos[Math.floor(Math.random() * tipos_vinos.length)] } });
        let stock = await Stock.create({ value: Math.floor(Math.random() * i) })

        creo el vino
        let wine = await Wine.create({
          name: `${type.dataValues.type} ${wineCellar.dataValues.name} ${i}`,
          description: `Vino ${category.dataValues.category} ${type.dataValues.type} de la bodega ${wineCellar.dataValues.name} con ${alcoholContent.dataValues.alcohol}% de alcohol.`
        })

        adiciono las relaciones
        await wine.setAlcoholContent(alcoholContent)
        await wine.setWineCellar(wineCellar)
        await wine.setCategory(category)
        await wine.setStock(stock)
        await wine.setType(type)

        guardo
        await wine.save();

      }

      console.log('vinos ya creados');


    }) */
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  /* app */

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* swagger config con app */

  const config = new DocumentBuilder()
    .setTitle('API title')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  /* app.use(bodyParser.urlencoded({ extended: true })) */

  app.use(cookieParser(process.env.COOKIE_SECRET));

  app.useGlobalPipes(new ValidationPipe())

  /* app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  ) */

  /* app.use(passport.initialize()) */

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina campos no definidos en el DTO
    forbidNonWhitelisted: true, // Rechaza solicitudes con campos no definidos en el DTO
    transform: true, // Transforma automáticamente la entrada en el tipo definido en el DTO
  }));

  await app.listen(port, "0.0.0.0", () => console.log(`http://localhost:${port}`));
}
bootstrap();