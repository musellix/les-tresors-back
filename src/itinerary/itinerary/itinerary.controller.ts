import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { ItineraryService } from './itinerary.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';

@ApiTags('Itinerary')
@Controller('itinerary')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService) {}

    @Get('')
    @ApiOperation({ summary: 'Get all itineraries' })
    @ApiResponse({ status: 200, description: 'List of itineraries', type: [Itinerary] })
    @ApiResponse({ status: 404, description: 'No itineraries found' })
    async getAllItineraries(): Promise<Itinerary[]> {
        return this.itineraryService.getAllItineraries();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get an itinerary' })
    @ApiResponse({ status: 200, description: 'itinerary detail', type: Itinerary })
    @ApiResponse({ status: 404, description: 'No itineraries found' })
    async getItinerary(@Param('id', ParseIntPipe) id: number): Promise<Itinerary> {
        return this.itineraryService.getItinerary(id);
    }

    @Post('/create')
    @ApiOperation({ summary: 'Create an itinerary' })
    @ApiBody({ type: CreateItineraryDto })
    @ApiResponse({ status: 201, description: 'Itinerary created successfully', type: Itinerary })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async createItinerary(@Body() body: CreateItineraryDto): Promise<Itinerary> {
        return this.itineraryService.createItinerary(body);
    }

    @Put('/update')
    @ApiOperation({ summary: 'Update an itinerary' })
    @ApiBody({ type: UpdateItineraryDto })
    @ApiResponse({ status: 200, description: 'Itinerary updated successfully', type: Itinerary })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async updateItinerary(@Body() body: UpdateItineraryDto): Promise<Itinerary> {
      return this.itineraryService.updateItinerary(body);
    }

}
