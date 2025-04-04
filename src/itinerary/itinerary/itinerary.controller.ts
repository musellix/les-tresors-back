import { Body, Controller, Post } from '@nestjs/common';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './create-itinerary.dto';
import { ItineraryService } from './itinerary.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Itinerary')
@Controller('itinerary')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Create an itinerary' })
    @ApiBody({ type: CreateItineraryDto })
    @ApiResponse({ status: 201, description: 'Itinerary created successfully', type: Itinerary })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async createItinerary(@Body() body: CreateItineraryDto): Promise<Itinerary> {
        return this.itineraryService.createItinerary(body);
    }
}
