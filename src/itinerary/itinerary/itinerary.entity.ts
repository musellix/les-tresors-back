import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Step } from '../step/step.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Korrigan } from 'src/korrigan/korrigan.entity';
import { LocationDto } from 'src/common/dto/location.dto';

export enum CacheType {
  MULTICACHE = 'Multicache',
  TRADITIONAL = 'Traditionelle',
}

@Entity()
export class Itinerary {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the itinerary', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The title of the itinerary', example: 'A bicyclette avec Louison' })
  title: string;

  @Column()
  @ApiProperty({ description: "The starting city of the itinerary", example: "Erce-près-Liffré" })
  startCity: string;
  
  @Column({ type: 'json' })
  @ApiProperty({ description: "The starting location of the itinerary", example: { latitude: 48.8566, longitude: 2.3522 } })
  startLocation: { latitude: number; longitude: number };

  @ManyToOne(() => Korrigan)
  @ApiProperty({ description: 'The theme of the itinerary', type: () => Korrigan })
  theme: Korrigan;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Type of cache used', enum: CacheType, example: 'Multicache' })
  typeOfCache: string;

  @Column({ type: 'int', default: 1 })
  @ApiProperty({ description: 'Difficulty level (1-5)', minimum: 1, maximum: 5, example: 2 })
  difficulty: number;

  @Column()
  @ApiProperty({ description: 'Estimated duration of the itinerary', example: '1 h' })
  duration: string;

  @Column()
  @ApiProperty({ description: 'Accessibility information', example: 'Wheelchair accessible' })
  accessibility: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'URL of the photo', example: 'https://example.com/photo.jpg', required: false })
  photoUrl?: string;

  @OneToMany(() => Step, (step) => step.itinerary)
  @ApiProperty({ description: 'Steps included in the itinerary', type: () => [Step] })
  steps: Step[];
}
