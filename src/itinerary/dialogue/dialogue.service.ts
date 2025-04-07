import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dialogue } from './dialogue.entity';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { Step } from '../step/step.entity';
import { UpdateDialogueDto } from './dto/update-dialogue.dto';

@Injectable()
export class DialogueService {
  constructor(
    @InjectRepository(Dialogue)
    private readonly dialogueRepository: Repository<Dialogue>,
    @InjectRepository(Step)
    private readonly stepRepository: Repository<Step>,
  ) {}

  /**
   * Creates a new dialogue and associates it with a step.
   * @param createDialogueDto - The data transfer object containing dialogue details.
   * @returns The created dialogue.
   * @throws Error if the step associated with the dialogue is not found.
   */
  async createDialogue(createDialogueDto: CreateDialogueDto, stepId: number): Promise<Dialogue> {
    const { orderId, character, replica } = createDialogueDto;

    const step = await this.stepRepository.findOne({ where: { id: stepId } });
    if (!step) {
      throw new Error('Step not found');
    }

    const dialogue = new Dialogue();
    dialogue.step = step;
    dialogue.orderId = orderId
    dialogue.character = character;
    dialogue.replica = replica;
    return this.dialogueRepository.save(dialogue);
  }

  /**
   * Updates an existing dialogue.
   * @param updateDialogueDto - The data transfer object containing updated dialogue details.
   * @returns The updated dialogue.
   * @throws Error if the dialogue to update is not found.
   */
  async updateDialogue(updateDialogueDto: UpdateDialogueDto): Promise<Dialogue> {
    const dialogue = await this.dialogueRepository.findOne({ where: { id: updateDialogueDto.id } });
    if (!dialogue) {
      throw new Error('Dialogue not found');
    }

    Object.assign(dialogue, updateDialogueDto);
    return this.dialogueRepository.save(dialogue);
  }
}
