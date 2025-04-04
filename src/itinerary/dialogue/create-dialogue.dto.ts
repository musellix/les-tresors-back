import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogueDto {
  @ApiProperty({ description: 'The ID of the associated step', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  stepId: number;

  @ApiProperty({ description: 'The ID of the character speaking', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  character: number;

  @ApiProperty({ description: 'The text of the dialogue', example: 'Salut les amis !' })
  @IsString()
  @IsNotEmpty()
  replica: string;
}