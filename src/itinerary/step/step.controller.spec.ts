import { Test, TestingModule } from '@nestjs/testing';
import { StepController } from './step.controller';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { Step } from './step.entity';
import { Itinerary } from '../itinerary/itinerary.entity';

describe('StepController', () => {
  let controller: StepController;
  let fakeStepService: Partial<StepService>;

  beforeEach(async () => {
    fakeStepService = {
      
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepController],
      providers: [
        {
          provide: StepService,
          useValue: fakeStepService,
        }
      ],
    }).compile();

    controller = module.get<StepController>(StepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
