import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, OneToMany } from 'typeorm';
import { Step } from '../step/step.entity';

export enum CacheType {
  MULTICACHE = 'Multicache',
  TRADITIONAL = 'Traditionellle',
}


@Entity()
export class Itinerary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true})
  title: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  theme: string;

  @Column({ type: 'text' })
  typeOfCache: string;

  @Column({ type: 'int', default: 1 })
  difficulty: number;

  @Column()
  duration: string;

  @Column()
  accesibility: string;

  @OneToMany(() => Step, (step) => step.itinerary)
  steps: Step[]
}
