import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';
import { CacheType, Itinerary } from './itinerary.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { StepService } from '../step/step.service';
import { Korrigan } from 'src/korrigan/korrigan.entity';
import { KorriganService } from 'src/korrigan/korrigan.service';

describe('ItineraryService', () => {
  let service: ItineraryService;
  let itineraryRepository: Repository<Itinerary>;
  let korriganRepository: Repository<Korrigan>;

  const mockStepService = {
    createStep: jest.fn(),
  };

  const mockKorriganService = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Test name',
      theme: 'Test theme',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItineraryService,
        {
          provide: getRepositoryToken(Itinerary),
          useValue: {
            save: jest.fn().mockResolvedValue(new Itinerary()),
          },
        },
        {
          provide: getRepositoryToken(Korrigan),
          useValue: mockKorriganService,
        },
        {
          provide: StepService,
          useValue: mockStepService,
        },
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
    itineraryRepository = module.get<Repository<Itinerary>>(getRepositoryToken(Itinerary));
    korriganRepository = module.get<Repository<Korrigan>>(getRepositoryToken(Korrigan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // createItinerary
  it('should create an itinerary', async () => {
    const createItineraryDto: CreateItineraryDto = {
      title: 'Test Itinerary',
      startCity: 'Test City',
      startLocation: { latitude: 48.8566, longitude: 2.3522 },
      themeId: 1,
      typeOfCache: CacheType.TRADITIONAL,
      difficulty: 1,
      duration: '1 hour',
      accessibility: 'Accessible',
      photoUrl: 'http://example.com/photo.jpg',
      steps: [],
    };

    const result = await service.createItinerary(createItineraryDto);

    expect(result).toBeDefined();
    expect(itineraryRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      title: createItineraryDto.title,
      // themeId: createItineraryDto.themeId,
      typeOfCache: createItineraryDto.typeOfCache,
      difficulty: createItineraryDto.difficulty,
      duration: createItineraryDto.duration,
      accessibility: createItineraryDto.accessibility,
      photoUrl: createItineraryDto.photoUrl,
    }));
  });

  it('should handle undefined photoUrl', async () => {
    const createItineraryDto: CreateItineraryDto = {
      title: 'Test Itinerary',
      startCity: 'Test City',
      startLocation: { latitude: 48.8566, longitude: 2.3522 },
      themeId: 1,
      typeOfCache: CacheType.TRADITIONAL,
      difficulty: 1,
      duration: '1 hour',
      accessibility: 'Accessible',
      photoUrl: undefined,
      steps: [],
    };

    const result = await service.createItinerary(createItineraryDto);

    expect(result).toBeDefined();
    expect(itineraryRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      title: createItineraryDto.title,
      // theme: createItineraryDto.theme,
      typeOfCache: createItineraryDto.typeOfCache,
      difficulty: createItineraryDto.difficulty,
      duration: createItineraryDto.duration,
      accessibility: createItineraryDto.accessibility,
      photoUrl: undefined,
    }));
  });
});
