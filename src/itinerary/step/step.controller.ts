import { Body, Controller, Post } from '@nestjs/common';
import { Step } from './step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { StepService } from './step.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Step')
@Controller('step')
export class StepController {

    constructor(private readonly stepService: StepService) {}

}
