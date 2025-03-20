import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary/itinerary.controller';
import { StepController } from './step/step.controller';
import { DialogueController } from './dialogue/dialogue.controller';

@Module({
  controllers: [ItineraryController, StepController, DialogueController]
})
export class ItineraryModule {}
