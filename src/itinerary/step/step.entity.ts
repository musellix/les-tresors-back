import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Itinerary } from '../itinerary/itinerary.entity';
import { Dialogue } from '../dialogue/dialogue.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Itinerary, (itinerary) => itinerary.steps)
  itinerary: Itinerary;

  @Column()
  title: string;

  @OneToMany(() => Dialogue, (dialogue) => dialogue.step)
  dialogues: Dialogue[]

  @Column()
  orderId: number;
}
