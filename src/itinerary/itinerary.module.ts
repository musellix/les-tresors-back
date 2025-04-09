import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItineraryController } from './itinerary/itinerary.controller';
import { StepController } from './step/step.controller';
import { DialogueController } from './dialogue/dialogue.controller';
import { ItineraryService } from './itinerary/itinerary.service';
import { DialogueService } from './dialogue/dialogue.service';
import { Step } from './step/step.entity';
import { Dialogue } from './dialogue/dialogue.entity';
import { Itinerary } from './itinerary/itinerary.entity';
import { StepService } from './step/step.service';
import { Korrigan } from 'src/korrigan/korrigan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Itinerary, Dialogue, Step, Korrigan])],
  controllers: [ItineraryController, StepController, DialogueController],
  providers: [ItineraryService, StepService, DialogueService]
})
export class ItineraryModule {}
