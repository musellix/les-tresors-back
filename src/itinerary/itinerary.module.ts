import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary/itinerary.controller';
import { StepController } from './step/step.controller';
import { DialogueController } from './dialogue/dialogue.controller';
import { ItineraryService } from './itinerary/itinerary.service';
import { DialogueService } from './dialogue/dialogue.service';

@Module({
  controllers: [ItineraryController, StepController, DialogueController],
  providers: [ItineraryService, DialogueService]
})
export class ItineraryModule {}
