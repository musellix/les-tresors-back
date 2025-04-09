import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsStringOrEmpty } from 'src/common/validators/is-string-or-empty.validator';

@Entity()
export class Korrigan {

  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the korrigan', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The name of the korrigan', example: 'Queen Aman' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The theme of the korrigan', example: 'histoire' })
  @IsStringOrEmpty()
  theme: string;

}
