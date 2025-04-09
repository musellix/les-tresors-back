import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Korrigan } from './korrigan.entity';
import { CreateKorriganDto } from './dto/create-korrigan.dto';
import { KorriganService } from './korrigan.service';

@Controller('korrigan')
export class KorriganController {

    constructor(private readonly korriganService: KorriganService) {}

    @Post('/create')
    @ApiOperation({ summary: 'Create a korrigan' })
    @ApiBody({ type: CreateKorriganDto })
    @ApiResponse({ status: 201, description: 'Korrigan created successfully', type: Korrigan })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async createKorrigan(@Body() body: CreateKorriganDto): Promise<Korrigan> {
        return this.korriganService.createKorrigan(body);
    }

}





