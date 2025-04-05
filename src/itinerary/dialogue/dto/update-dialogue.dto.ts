import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDialogueDto {
  @ApiProperty({ description: "The ID of the dialogue to update", example: 1 })
  @IsNotEmpty()
  @IsInt()
  id: number;

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