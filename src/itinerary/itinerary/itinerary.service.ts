import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { Itinerary } from './itinerary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepService } from '../step/step.service';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { Korrigan } from 'src/korrigan/korrigan.entity';

@Injectable()
export class ItineraryService {

    constructor(
        @InjectRepository(Itinerary)
        private itineraryRepository: Repository<Itinerary>,
        @InjectRepository(Korrigan)
        private korriganRepository: Repository<Korrigan>,
        private readonly stepService: StepService,
    ) {}

    /**
     * Retrieves all itineraries from the database.
     * @returns An array of itineraries.
     */
    async getAllItineraries(): Promise<Itinerary[]> {
        const itineraries = await this.itineraryRepository.find({ relations: ['theme'] });
        if (!itineraries || itineraries.length === 0) {
            throw new Error('No itineraries found');
        }
        return itineraries;
    }

    /**
     * Retrieves a specific itinerary by its ID.
     * @param id - The unique identifier of the itinerary to retrieve. This parameter must be a positive integer.
     * @returns A promise that resolves to an Itinerary object if the itinerary is found.
     * @throws {NotFoundException} If no itinerary is found with the provided ID.
     */
    async getItinerary(id: number): Promise<Itinerary> {
        const itinerary = await this.itineraryRepository.findOne({
            where: { id },
            relations: {
                theme: true, 
                steps: {
                    dialogues: true
                }
            },
            order: {
                steps: {
                    orderId: 'ASC',
                    dialogues: {
                        orderId: 'ASC',
                    },
                },
            },
        });      
        if (!itinerary) {
            throw new NotFoundException(`Itinerary with ID ${id} not found`);
        }      
        return itinerary;
    }

    /**
     * Creates a new itinerary and its associated steps.
     * @param createItineraryDto - The data transfer object containing itinerary details and steps.
     * @returns The created itinerary.
     * @throws Error if any step creation fails.
     */
    async createItinerary(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
        const korrigan = await this.korriganRepository.findOne({ where: { id: createItineraryDto.themeId } });
        if (!korrigan) {
          throw new Error('Korrigan not found');
        }

        const itinerary = new Itinerary();
        itinerary.title = createItineraryDto.title;
        itinerary.theme = korrigan; 
        itinerary.typeOfCache = createItineraryDto.typeOfCache;
        itinerary.difficulty = createItineraryDto.difficulty;
        itinerary.duration = createItineraryDto.duration;
        itinerary.accessibility = createItineraryDto.accessibility;
        itinerary.photoUrl = createItineraryDto.photoUrl ?? undefined;
        const itinerarySaved: Itinerary = await this.itineraryRepository.save(itinerary);

        // save steps
        const stepPromises = createItineraryDto.steps.map((step) => {
            this.stepService.createStep(step, itinerarySaved.id);
        });
        await Promise.all(stepPromises);

        return itinerarySaved
    }

    /**
     * Updates an existing itinerary and its associated steps.
     * @param updateItineraryDto - The data transfer object containing updated itinerary details and steps.
     * @returns The updated itinerary.
     * @throws Error if the itinerary to update is not found.
     */
    async updateItinerary(updateItineraryDto: UpdateItineraryDto): Promise<Itinerary> {
        const itinerary = await this.itineraryRepository.findOneBy({ id: updateItineraryDto.id });
        if (!itinerary) {
            throw new Error('Itinerary not found');
        }

        const korrigan = await this.korriganRepository.findOne({ where: { id: updateItineraryDto.themeId } });
        if (!korrigan) {
          throw new Error('Korrigan not found');
        }

        itinerary.title = updateItineraryDto.title;
        itinerary.theme = korrigan; 
        itinerary.typeOfCache = updateItineraryDto.typeOfCache;
        itinerary.difficulty = updateItineraryDto.difficulty;
        itinerary.duration = updateItineraryDto.duration;
        itinerary.accessibility = updateItineraryDto.accessibility;
        itinerary.photoUrl = updateItineraryDto.photoUrl ?? undefined;

        // update steps
        const stepPromises = updateItineraryDto.steps.map((step) => {
            this.stepService.updateStep({...step, itineraryId: updateItineraryDto.id});
        });
        await Promise.all(stepPromises);

        return this.itineraryRepository.save(itinerary);
    }



}
