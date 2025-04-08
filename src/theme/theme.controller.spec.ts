import { Test, TestingModule } from '@nestjs/testing';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { Theme } from './theme.entity';

describe('ThemeController', () => {
  let controller: ThemeController;
  let themeService: ThemeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemeController],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            createTheme: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ThemeController>(ThemeController);
    themeService = module.get<ThemeService>(ThemeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTheme', () => {
    it('should create a theme successfully', async () => {
      const createThemeDto: CreateThemeDto = {
        korrigan: 'Queen Aman',
        category: '1 h',
        pictureUrl: 'https://example.com/photo.jpg',
      };
  
      const createdTheme: Theme = {
        id: 1,
        korrigan: 'Queen Aman',
        category: '1 h',
        pictureUrl: 'https://example.com/photo.jpg',
      };
  
      jest.spyOn(themeService, 'createTheme').mockResolvedValue(createdTheme);
  
      const result = await controller.createTheme(createThemeDto);
  
      expect(themeService.createTheme).toHaveBeenCalledWith(createThemeDto);
      expect(result).toEqual(createdTheme);
    });
  
    it('should throw a validation error if the input is invalid', async () => {
      const createThemeDto: any = {
        korrigan: '', // Invalid korrigan
        category: '1 h',
        pictureUrl: 'https://example.com/photo.jpg',
      };
  
      jest.spyOn(themeService, 'createTheme').mockImplementation(() => {
        throw new Error('Validation error');
      });
  
      await expect(controller.createTheme(createThemeDto)).rejects.toThrow('Validation error');
      expect(themeService.createTheme).toHaveBeenCalledWith(createThemeDto);
    });
  });
});