import { Body, Controller, Post } from '@nestjs/common';
import { Step } from './step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { StepService } from './step.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Step')
@Controller('step')
export class StepController {

    constructor(private readonly stepService: StepService) {}

    @Post("/create")
    @ApiOperation({ summary: 'Create a new step' })
    @ApiBody({ type: CreateStepDto })
    @ApiResponse({ status: 201, description: 'Step created successfully', type: Step })
    @ApiResponse({ status: 400, description: 'Validation error' })
    async createStep(@Body() body: CreateStepDto): Promise<Step> {
        return this.stepService.createStep(body);
    }

}
