import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import { Itinerary } from '../itinerary/itinerary.entity';
import { Step } from '../step/step.entity';

@Entity()
export class Dialogue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Step, (step) => step.dialogues)
  step: Step;

  @Column()
  character: number;

  @Column()
  replica: string;
}
