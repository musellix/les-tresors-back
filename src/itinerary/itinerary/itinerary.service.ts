import { Injectable } from '@nestjs/common';
import { CreateItineraryDto } from './create-itinerary.dto';
import { Itinerary } from './itinerary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItineraryService {

    constructor(
        @InjectRepository(Itinerary)
        private itineraryRepository: Repository<Itinerary>,
    ) {}

    createItinerary(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
        const itinerary = new Itinerary();
        itinerary.title = createItineraryDto.title;
        itinerary.theme = createItineraryDto.theme; 
        itinerary.typeOfCache = createItineraryDto.typeOfCache;
        itinerary.difficulty = createItineraryDto.difficulty;
        itinerary.duration = createItineraryDto.duration;
        itinerary.accessibility = createItineraryDto.accessibility;
        itinerary.photoUrl = createItineraryDto.photoUrl ?? undefined;
        return this.itineraryRepository.save(itinerary)
    }
}
