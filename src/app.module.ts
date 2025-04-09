import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { KorriganModule } from './korrigan/korrigan.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ItineraryModule, KorriganModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
