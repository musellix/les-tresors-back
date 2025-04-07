import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { ThemeModule } from './theme/theme.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ItineraryModule, ThemeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
