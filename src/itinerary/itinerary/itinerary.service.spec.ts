import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryService } from './itinerary.service';
import { Itinerary } from './itinerary.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ItineraryService', () => {
  let service: ItineraryService;
  let itineraryRepository: Repository<Itinerary>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItineraryService,
        {
          provide: getRepositoryToken(Itinerary),
          useValue: {
            save: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<ItineraryService>(ItineraryService);
    itineraryRepository = module.get<Repository<Itinerary>>(getRepositoryToken(Itinerary));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
