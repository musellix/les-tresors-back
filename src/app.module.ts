import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ItineraryModule } from './itinerary/itinerary.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, ItineraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
