import { Module } from '@nestjs/common';
import { AdminWineController } from './admin-wine.controller';
import { AdminWineService } from './admin-wine.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { defaultForRoot } from 'importOptions/defaultForRoot.option';
import { defaultForFeature } from 'importOptions/defaultForFeature.option';

@Module({
  imports: [
    SequelizeModule.forRoot(defaultForRoot),
    SequelizeModule.forFeature(defaultForFeature)
  ],
  controllers: [AdminWineController],
  providers: [AdminWineService]
})
export class AdminWineModule { }
