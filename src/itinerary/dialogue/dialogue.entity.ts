import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Step } from '../step/step.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Korrigan } from 'src/korrigan/korrigan.entity';

export enum DialogueType {
  DIALOGUE = 'dialogue',
  INFORMATION = 'information',
  QUESTION = 'question',
}

@Entity()
export class Dialogue {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the dialogue', example: 1 })
  id: number;

  @ManyToOne(() => Step, (step) => step.dialogues)
  @ApiProperty({ description: 'The step associated with this dialogue', type: () => Step })
  step: Step;

  @Column()
  @ApiProperty({ description: 'The order of the dialogue in the step', example: 1 })
  orderId: number;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'The type of the dialogue', enum: DialogueType, example: DialogueType.INFORMATION })
  dialogueType: DialogueType;
  
  @ManyToOne(() => Korrigan, { nullable: true })
  @ApiProperty({ description: 'The korrigan associated with this dialogue', type: () => Korrigan })
  korrigan: Korrigan | null = null;

  @Column()
  @ApiProperty({ description: 'The text of the dialogue', example: 'Hello, welcome to the adventure!' })
  replica: string;

}
