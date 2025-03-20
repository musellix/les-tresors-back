import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary/itinerary.controller';
import { StepController } from './step/step.controller';

@Module({
  controllers: [ItineraryController, StepController]
})
export class ItineraryModule {}
