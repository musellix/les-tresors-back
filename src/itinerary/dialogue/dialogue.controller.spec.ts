import { Test, TestingModule } from '@nestjs/testing';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Dialogue } from './dialogue.entity';
import { Step } from '../step/step.entity';

describe('DialogueController', () => {
  let controller: DialogueController;
  let fakeDialogueService: Partial<DialogueService>;

  beforeEach(async () => {
    fakeDialogueService = {
      
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogueController],
      providers: [
        {
          provide: DialogueService,
          useValue: fakeDialogueService,
        }
      ]
    }).compile();

    controller = module.get<DialogueController>(DialogueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
