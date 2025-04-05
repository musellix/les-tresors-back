import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';
import { CacheType, Itinerary } from './itinerary.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { StepService } from '../step/step.service';

describe('ItineraryService', () => {
  let service: ItineraryService;
  let itineraryRepository: Repository<Itinerary>;

  const mockStepService = {
    createStep: jest.fn(),
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
          provide: StepService,
          useValue: mockStepService,
        },
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
    itineraryRepository = module.get<Repository<Itinerary>>(getRepositoryToken(Itinerary));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // createItinerary
  it('should create an itinerary', async () => {
    const createItineraryDto: CreateItineraryDto = {
      title: 'Test Itinerary',
      theme: 'Histore',
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
      theme: createItineraryDto.theme,
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
      theme: 'Histore',
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
      theme: createItineraryDto.theme,
      typeOfCache: createItineraryDto.typeOfCache,
      difficulty: createItineraryDto.difficulty,
      duration: createItineraryDto.duration,
      accessibility: createItineraryDto.accessibility,
      photoUrl: undefined,
    }));
  });
});
