import { Test, TestingModule } from '@nestjs/testing';
import { StepController } from './step.controller';
import { StepService } from './step.service';
import { CreateStepDto } from './create-step.dto';
import { Step } from './step.entity';
import { Itinerary } from '../itinerary/itinerary.entity';

describe('StepController', () => {
  let controller: StepController;
  let fakeStepService: Partial<StepService>;

  beforeEach(async () => {
    fakeStepService = {
      createStep: (dto: CreateStepDto) => {
        const itineraryInstance = new Itinerary();
        itineraryInstance.id = dto.itineraryId;
        itineraryInstance.title = dto.title;

        return Promise.resolve({
          id: 1,
          itinerary: itineraryInstance,
          title: dto.title,
          dialogues: [],
        } as Step);
      },
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

  describe('createStep', () => {
    it('should call StepService.createStep and return the created step', async () => {
      const createStepDto: CreateStepDto = {
        title: 'Test Step',
        itineraryId: 1,
        dialogues: [],
      };

      const createStepSpy = jest.spyOn(fakeStepService, 'createStep');
      const result = await controller.createStep(createStepDto);

      expect(createStepSpy).toHaveBeenCalledWith(createStepDto);
      expect(result).toEqual({
        id: 1,
        title: 'Test Step',
        itinerary: { id: 1, title: 'Test Step' },
        dialogues: [],
      });
    });
  });
});
