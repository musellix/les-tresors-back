import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsStringOrEmpty } from 'src/common/validators/is-string-or-empty.validator';

@Entity()
export class Theme {

  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique ID of the theme', example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'The korrigan of the theme', example: 'Queen Aman' })
  korrigan: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The category of the theme', example: 'histoire' })
  @IsStringOrEmpty()
  category: string;

  @Column()
  @ApiProperty({ description: 'URL of the picture of the korrigan', example: 'https://example.com/photo.jpg' })
  pictureName: string;
}
