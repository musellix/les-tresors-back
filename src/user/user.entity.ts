import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the user', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  username: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
  email: string;

  @Column()
  @ApiProperty({ description: 'The hashed password of the user', example: '$2b$10$hashedpassword' })
  password: string;  // TODO stockez un hash du mot de passe

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'The date when the user was created', example: '2025-04-06T12:34:56Z' })
  createdAt: Date;
}
