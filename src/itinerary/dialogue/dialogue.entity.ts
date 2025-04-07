import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Step } from '../step/step.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Dialogue {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the dialogue', example: 1 })
  id: number;

  @ManyToOne(() => Step, (step) => step.dialogues)
  @ApiProperty({ description: 'The step associated with this dialogue', type: () => Step })
  step: Step;

  @Column()
  @ApiProperty({ description: 'The character ID associated with the dialogue', example: 101 })
  character: number;

  @Column()
  @ApiProperty({ description: 'The text of the dialogue', example: 'Hello, welcome to the adventure!' })
  replica: string;

  @Column()
  @ApiProperty({ description: 'The order of the dialogue in the step', example: 1 })
  orderId: number;
}
