import { Test, TestingModule } from '@nestjs/testing';
import { DialogueService } from './dialogue.service';
import { Dialogue } from './dialogue.entity';
import { Step } from '../step/step.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Korrigan } from 'src/korrigan/korrigan.entity';

describe('DialogueService', () => {
  let service: DialogueService;
  let dialogueRepository: Repository<Dialogue>;
  let stepRepository: Repository<Step>;
  let korriganRepository: Repository<Korrigan>;

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
        {
          provide: getRepositoryToken(Korrigan),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DialogueService>(DialogueService);
    dialogueRepository = module.get<Repository<Dialogue>>(getRepositoryToken(Dialogue));
    stepRepository = module.get<Repository<Step>>(getRepositoryToken(Step));
    korriganRepository = module.get<Repository<Korrigan>>(getRepositoryToken(Korrigan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a dialogue', async () => {
    const mockStep = new Step();
    jest.spyOn(stepRepository, 'findOne').mockResolvedValue(mockStep);

    // Mock dialogue.save method
    jest.spyOn(dialogueRepository, 'save').mockResolvedValue(new Dialogue());

    const mockKorrigan = new Korrigan();
    jest.spyOn(korriganRepository, 'findOne').mockResolvedValue(mockKorrigan);

    const result = await service.createDialogue({
      orderId: 1,
      korriganId: 0,
      replica: 'Hello tests',
    }, 1);

    // Assertions
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Dialogue);
    expect(dialogueRepository.save).toHaveBeenCalledWith(expect.any(Dialogue));
  });
});
