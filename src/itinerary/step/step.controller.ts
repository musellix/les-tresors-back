import { Body, Controller, Post } from '@nestjs/common';
import { Step } from './step.entity';
import { CreateStepDto } from './create-step.dto';
import { StepService } from './step.service';

@Controller('step')
export class StepController {

    constructor(private readonly stepService: StepService) {}

    @Post("/create")
    async createStep(@Body() body: CreateStepDto): Promise<Step> {
        return this.stepService.createStep(body);
    }

}
