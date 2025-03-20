import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary/itinerary.controller';

@Module({
  controllers: [ItineraryController]
})
export class ItineraryModule {}
