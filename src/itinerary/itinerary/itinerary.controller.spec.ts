import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { CreateItineraryDto } from './create-itinerary.dto';
import { CacheType, Itinerary } from './itinerary.entity';

describe('ItineraryController', () => {
  let controller: ItineraryController;
  let fakeItineraryService: Partial<ItineraryService>;

  beforeEach(async () => {
    fakeItineraryService = {
      createItinerary: (dto: CreateItineraryDto) => {
        return Promise.resolve({
          id: 1,
          title: dto.title,
          theme: dto.theme,
          typeOfCache: dto.typeOfCache,
          difficulty: dto.difficulty,
          duration: dto.duration,
          accessibility: dto.accessibility,
          photoUrl: dto.photoUrl,
          steps: [],
        } as Itinerary);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryController],
      providers: [
        {
          provide: ItineraryService,
          useValue: fakeItineraryService,
        }
      ],
    }).compile();

    controller = module.get<ItineraryController>(ItineraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // createItinerary
  it('should create an itinerary', async () => {
    const createItineraryDto: CreateItineraryDto = {
      title: 'test title',
      theme: '',
      typeOfCache: CacheType.TRADITIONAL,
      difficulty: 1,
      duration: '1 hour',
      accessibility: 'Easy',
      photoUrl: 'http://example.com/photo.jpg',
      steps: [],
    };

    const createItinerarySpy = jest.spyOn(fakeItineraryService, 'createItinerary');
    const result = await controller.createItinerary(createItineraryDto);

    expect(result).toBeDefined();
    expect(result.title).toBe(createItineraryDto.title);

    // ce test garantit que le contrôleur interagit correctement avec le service en transmettant les données appropriées
    expect(createItinerarySpy).toHaveBeenCalledWith(createItineraryDto);
  });
});
