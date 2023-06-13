import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WineModule } from './wine/wine.module';
import { AdminWineModule } from './admin-wine/admin-wine.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [UserModule, WineModule, AdminWineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
