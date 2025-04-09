import { Test, TestingModule } from '@nestjs/testing';
import { KorriganController } from './korrigan.controller';
import { KorriganService } from './korrigan.service';
import { CreateKorriganDto } from './dto/create-korrigan.dto';
import { Korrigan } from './korrigan.entity';

describe('KorriganController', () => {
  let controller: KorriganController;
  let korriganService: KorriganService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KorriganController],
      providers: [
        {
          provide: KorriganService,
          useValue: {
            createKorrigan: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<KorriganController>(KorriganController);
    korriganService = module.get<KorriganService>(KorriganService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createKorrigan', () => {
    it('should create a korrigan successfully', async () => {
      const createKorriganDto: CreateKorriganDto = {
        name: 'Queen Aman',
        theme: 'histoire',
      };
  
      const createdKorrigan: Korrigan = {
        id: 1,
        name: 'Queen Aman',
        theme: 'histoire',
      };
  
      jest.spyOn(korriganService, 'createKorrigan').mockResolvedValue(createdKorrigan);
  
      const result = await controller.createKorrigan(createKorriganDto);
  
      expect(korriganService.createKorrigan).toHaveBeenCalledWith(createKorriganDto);
      expect(result).toEqual(createdKorrigan);
    });
  
    it('should throw a validation error if the input is invalid', async () => {
      const createKorriganDto: CreateKorriganDto = {
        name: '', // Invalid korrigan
        theme: 'histoire',
      };
  
      jest.spyOn(korriganService, 'createKorrigan').mockImplementation(() => {
        throw new Error('Validation error');
      });
  
      await expect(controller.createKorrigan(createKorriganDto)).rejects.toThrow('Validation error');
      expect(korriganService.createKorrigan).toHaveBeenCalledWith(createKorriganDto);
    });
  });
});