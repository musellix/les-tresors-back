import { Body, Controller, Post } from '@nestjs/common';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './create-itinerary.dto';
import { ItineraryService } from './itinerary.service';

@Controller('itinerary')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService) {}

    @Post("/create")
    async createItinerary(@Body() body: CreateItineraryDto): Promise<Itinerary> {
        return this.itineraryService.createItinerary(body);
    }
}
