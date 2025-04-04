import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Itinerary } from '../itinerary/itinerary.entity';
import { Dialogue } from '../dialogue/dialogue.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the step', example: 1 })
  id: number;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.steps)
  @ApiProperty({ description: 'The itinerary associated with this step', type: () => Itinerary })
  itinerary: Itinerary;

  @Column()
  @ApiProperty({ description: 'The title of the step', example: 'Step 1: Starting Point' })
  title: string;

  @OneToMany(() => Dialogue, (dialogue) => dialogue.step)
  @ApiProperty({ description: 'Dialogues associated with this step', type: () => [Dialogue] })
  dialogues: Dialogue[];

  @Column()
  @ApiProperty({ description: 'The order of the step in the itinerary', example: 1 })
  orderId: number;
}
