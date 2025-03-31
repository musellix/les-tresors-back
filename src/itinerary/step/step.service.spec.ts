import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepService } from './step.service';
import { Step } from './step.entity';
import { CreateStepDto } from './create-step.dto';
import { Itinerary } from '../itinerary/itinerary.entity';
import { DialogueService } from '../dialogue/dialogue.service';

describe('StepService', () => {
  let service: StepService;
  let stepRepository: Partial<Repository<Step>>;
  let itineraryRepository: Partial<Repository<Itinerary>>;
  let dialogueService: Partial<DialogueService>;

  beforeEach(async () => {
    stepRepository = {
      save: jest.fn().mockResolvedValue(new Step()),
    };

    itineraryRepository = {
      findOne: jest.fn().mockResolvedValue(new Itinerary()),
    };

    dialogueService = {
      createDialogue: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StepService,
        {
          provide: getRepositoryToken(Step),
          useValue: stepRepository,
        },
        {
          provide: getRepositoryToken(Itinerary),
          useValue: itineraryRepository,
        },
        {
          provide: DialogueService,
          useValue: dialogueService,
        },
      ],
    }).compile();

    service = module.get<StepService>(StepService);
    stepRepository = module.get<Repository<Step>>(getRepositoryToken(Step));
    itineraryRepository = module.get<Repository<Itinerary>>(getRepositoryToken(Itinerary));
    dialogueService = module.get<DialogueService>(DialogueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStep', () => {
    it('should create a step with an associated itinerary', async () => {
      const createStepDto: CreateStepDto = {
        title: 'Test Step',
        itineraryId: 1,
        dialogues: [
          { stepId: 1, character: 1, replica: 'Dialogue 1' },
          { stepId: 2, character: 2, replica: 'Dialogue 2' },
        ],
      };

      const itinerary = new Itinerary();
      itinerary.id = 1;
      itineraryRepository.findOne = jest.fn().mockResolvedValue(itinerary);

      const step = new Step();
      step.title = createStepDto.title;
      step.itinerary = itinerary;
      stepRepository.save = jest.fn().mockResolvedValue(step);

      const result = await service.createStep(createStepDto);
      step.id = result.id;

      expect(result).toBeDefined();
      expect(result.title).toBe(createStepDto.title);
      expect(result.itinerary).toBe(itinerary);

      expect(itineraryRepository.findOne).toHaveBeenCalledWith({ where: { id: createStepDto.itineraryId } });
      expect(stepRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        title: createStepDto.title,
        itinerary,
      }));

      expect(dialogueService.createDialogue).toHaveBeenCalledTimes(createStepDto.dialogues.length);
    });

    it('should throw an error if itinerary is not found', async () => {
      itineraryRepository.findOne = jest.fn().mockResolvedValue(null);

      const createStepDto: CreateStepDto = {
        title: 'Test Step',
        itineraryId: 999,
        dialogues: [],
      };

      await expect(service.createStep(createStepDto)).rejects.toThrow('Itinerary not found');
      expect(itineraryRepository.findOne).toHaveBeenCalledWith({ where: { id: createStepDto.itineraryId } });
      expect(stepRepository.save).not.toHaveBeenCalled();
      expect(dialogueService.createDialogue).not.toHaveBeenCalled();
    });
  });
});
