import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { Itinerary } from '../itinerary/itinerary.entity';
import { DialogueService } from '../dialogue/dialogue.service';

@Injectable()
export class StepService {

    constructor(
        @InjectRepository(Step)
        private stepRepository: Repository<Step>,
        @InjectRepository(Itinerary)
        private itineraryRepository: Repository<Itinerary>,
        private dialogueService: DialogueService,
    ) {}

    async createStep(createStepDto: CreateStepDto): Promise<Step> {
        const { title, itineraryId, dialogues = [] } = createStepDto;

        const itinerary = await this.itineraryRepository.findOne({ where: { id: itineraryId } });
        if (!itinerary) {
          throw new Error('Itinerary not found');
        }
    
        const step = new Step();
        step.title = title;
        step.itinerary = itinerary;
        const savedStep = await this.stepRepository.save(step);
    
        // save dialogues
        const dialoguesPromise = dialogues.map((dialogue) => {
          this.dialogueService.createDialogue({ ...dialogue, stepId: savedStep.id });
        })
        await Promise.all(dialoguesPromise);
    
        return savedStep;
    }
}
