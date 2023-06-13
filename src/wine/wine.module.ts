import { Module } from '@nestjs/common';
import { WineController } from './wine.controller';
import { WineService } from './wine.service';

/* configuración de imports */
import { SequelizeModule } from '@nestjs/sequelize';
import { defaultForRoot } from 'importOptions/defaultForRoot.option';
import { defaultForFeature } from 'importOptions/defaultForFeature.option';

@Module({
  imports: [
    SequelizeModule.forRoot(defaultForRoot),
    SequelizeModule.forFeature(defaultForFeature),
  ],
  controllers: [WineController],
  providers: [WineService]
})
export class WineModule { }
