import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';



dotenv.config();

@Module({
  imports: [
    /* SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      models: [User, Wine, User_Wine, WineCellar, Category, Type, Stock, AlcoholContent],
      autoLoadModels: true,
      logging: console.log
    }) */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
