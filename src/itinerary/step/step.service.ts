import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Step } from './step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { Itinerary } from '../itinerary/itinerary.entity';
import { DialogueService } from '../dialogue/dialogue.service';
import { UpdateStepDto } from './dto/update-step.dto';

@Injectable()
export class StepService {

    constructor(
        @InjectRepository(Step)
        private stepRepository: Repository<Step>,
        @InjectRepository(Itinerary)
        private itineraryRepository: Repository<Itinerary>,
        private dialogueService: DialogueService,
    ) {}

    /**
     * Creates a new step and its associated dialogues.
     * @param createStepDto - The data transfer object containing step details and dialogues.
     * @param itineraryId - The id of the itinerary associated.
     * @returns The created step.
     * @throws Error if the associated itinerary is not found.
     */
    async createStep(createStepDto: CreateStepDto, itineraryId: number): Promise<Step> {
        const { title, orderId, dialogues = [] } = createStepDto;

        const itinerary = await this.itineraryRepository.findOne({ where: { id: itineraryId } });
        if (!itinerary) {
          throw new Error('Itinerary not found');
        }
    
        const step = new Step();
        step.title = title;
        step.orderId = orderId;
        step.itinerary = itinerary;
        const savedStep = await this.stepRepository.save(step);
    
        // save dialogues
        const dialoguesPromise = dialogues.map((dialogue) => {
          this.dialogueService.createDialogue(dialogue, savedStep.id);
        })
        await Promise.all(dialoguesPromise);
    
        return savedStep;
    }

    /**
     * Updates an existing step and its associated dialogues.
     * @param updateStepDto - The data transfer object containing updated step details and dialogues.
     * @returns The updated step.
     * @throws Error if the step or associated itinerary is not found.
     */
    async updateStep(updateStepDto: UpdateStepDto): Promise<Step> {
        const { id, orderId, title, itineraryId, dialogues = [] } = updateStepDto;
    
        const step = await this.stepRepository.findOne({ where: { id } });
        if (!step) {
          throw new Error('Step not found');
        }
    
        const itinerary = await this.itineraryRepository.findOne({ where: { id: itineraryId } });
        if (!itinerary) {
          throw new Error('Itinerary not found');
        }
    
        step.title = title;
        step.orderId = orderId;
        step.itinerary = itinerary;
    
        // update dialogues
        const dialoguesPromise = dialogues.map((dialogue) => {
          this.dialogueService.updateDialogue({ ...dialogue, stepId: id });
        })
        await Promise.all(dialoguesPromise);
    
        return this.stepRepository.save(step);
    }
}
