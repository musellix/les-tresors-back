import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dialogue } from './dialogue.entity';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Step } from '../step/step.entity';

@Injectable()
export class DialogueService {
  constructor(
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  async createDialogue(createDialogueDto: CreateDialogueDto): Promise<Dialogue> {
    const { stepId, character, replica } = createDialogueDto;

    const step = await this.stepRepository.findOne({ where: { id: stepId } });
    if (!step) {
      throw new Error('Step not found');
    }

    const dialogue = new Dialogue();
    dialogue.step = step;
    dialogue.character = character;
    dialogue.replica = replica;

    return this.dialogueRepository.save(dialogue);
  }
}
