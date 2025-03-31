import { Test, TestingModule } from '@nestjs/testing';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { CreateDialogueDto } from './create-dialogue.dto';
import { Dialogue } from './dialogue.entity';
import { Step } from '../step/step.entity';

describe('DialogueController', () => {
  let controller: DialogueController;
  let fakeDialogueService: Partial<DialogueService>;

  beforeEach(async () => {
    fakeDialogueService = {
      createDialogue: (dto: CreateDialogueDto) => {
        const stepInstance = new Step();
        stepInstance.id = 1;
        stepInstance.title = 'Step de test';

        return Promise.resolve({
          id: 1,
          step: stepInstance,
          character: dto.character,
          replica: dto.replica,
        } as Dialogue);
      },
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

  it('should create a dialogue', async () => {
    const createDialogueDto: CreateDialogueDto = {
      stepId: 1,
      character: 1,
      replica: 'Hello, this is a test dialogue.',
    };

    const createDialogueSpy = jest.spyOn(fakeDialogueService, 'createDialogue');
    const result = await controller.createDialogue(createDialogueDto);

    expect(result).toBeDefined();
    expect(result.replica).toBe(createDialogueDto.replica);

    // ce test garantit que le contrôleur interagit correctement avec le service en transmettant les données appropriées
    expect(createDialogueSpy).toHaveBeenCalledWith(createDialogueDto);
  });
});
