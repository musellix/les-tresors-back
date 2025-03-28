import { Test, TestingModule } from '@nestjs/testing';
import { DialogueService } from './dialogue.service';
import { Dialogue } from './dialogue.entity';
import { Step } from '../step/step.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('DialogueService', () => {
  let service: DialogueService;
  let dialogueRepository: Repository<Dialogue>;
  let stepRepository: Repository<Step>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DialogueService,
        {
          provide: getRepositoryToken(Dialogue),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Step),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DialogueService>(DialogueService);
    dialogueRepository = module.get<Repository<Dialogue>>(getRepositoryToken(Dialogue));
    stepRepository = module.get<Repository<Step>>(getRepositoryToken(Step));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a dialogue', async () => {
    const mockStep = new Step();
    jest.spyOn(stepRepository, 'findOne').mockResolvedValue(mockStep);

    // Mock dialogue.save method
    jest.spyOn(dialogueRepository, 'save').mockResolvedValue(new Dialogue());

    const result = await service.createDialogue({
      stepId: 1,
      character: 0,
      replica: 'Hello tests',
    });

    // Assertions
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Dialogue);
    expect(dialogueRepository.save).toHaveBeenCalledWith(expect.any(Dialogue));
  });
});
