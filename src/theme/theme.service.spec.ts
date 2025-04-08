import { Test, TestingModule } from '@nestjs/testing';
import { ThemeService } from './theme.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './theme.entity';
import { CreateThemeDto } from './dto/create-theme.dto';

describe('ThemeService', () => {
  let service: ThemeService;
  let repository: Repository<Theme>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemeService,
        {
          provide: getRepositoryToken(Theme),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ThemeService>(ThemeService);
    repository = module.get<Repository<Theme>>(getRepositoryToken(Theme));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      } as Theme;

      jest.spyOn(repository, 'create').mockReturnValue(createdTheme);
      jest.spyOn(repository, 'save').mockResolvedValue(createdTheme);

      const result = await service.createTheme(createThemeDto);

      expect(repository.create).toHaveBeenCalledWith(createThemeDto);
      expect(repository.save).toHaveBeenCalledWith(createdTheme);
      expect(result).toEqual(createdTheme);
    });
  });
});