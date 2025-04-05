import { Injectable } from '@nestjs/common';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { Itinerary } from './itinerary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepService } from '../step/step.service';

@Injectable()
export class ItineraryService {

    constructor(
        @InjectRepository(Itinerary)
        private itineraryRepository: Repository<Itinerary>,
        private readonly stepService: StepService,
    ) {}

    async createItinerary(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
        const itinerary = new Itinerary();
        itinerary.title = createItineraryDto.title;
        itinerary.theme = createItineraryDto.theme; 
        itinerary.typeOfCache = createItineraryDto.typeOfCache;
        itinerary.difficulty = createItineraryDto.difficulty;
        itinerary.duration = createItineraryDto.duration;
        itinerary.accessibility = createItineraryDto.accessibility;
        itinerary.photoUrl = createItineraryDto.photoUrl ?? undefined;
        const itinerarySaved: Itinerary = await this.itineraryRepository.save(itinerary);

        // save steps
        const stepPromises = createItineraryDto.steps.map((step) => {
            this.stepService.createStep({...step, itineraryId: itinerarySaved.id});
        });
        await Promise.all(stepPromises);

        return itinerarySaved
    }
}
