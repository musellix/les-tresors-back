import { Test, TestingModule } from '@nestjs/testing';
import { KorriganService } from './korrigan.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Korrigan } from './korrigan.entity';
import { CreateKorriganDto } from './dto/create-korrigan.dto';

describe('KorriganService', () => {
  let service: KorriganService;
  let repository: Repository<Korrigan>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KorriganService,
        {
          provide: getRepositoryToken(Korrigan),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<KorriganService>(KorriganService);
    repository = module.get<Repository<Korrigan>>(getRepositoryToken(Korrigan));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      } as Korrigan;

      jest.spyOn(repository, 'create').mockReturnValue(createdKorrigan);
      jest.spyOn(repository, 'save').mockResolvedValue(createdKorrigan);

      const result = await service.createKorrigan(createKorriganDto);

      expect(repository.create).toHaveBeenCalledWith(createKorriganDto);
      expect(repository.save).toHaveBeenCalledWith(createdKorrigan);
      expect(result).toEqual(createdKorrigan);
    });
  });
});