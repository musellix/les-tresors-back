import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogueDto {
  @ApiProperty({ description: 'The order of the dialog in the step', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: 'The ID of the character speaking', example: 'Barbobec' })
  @IsString()
  @IsNotEmpty()
  character: string;

  @ApiProperty({ description: 'The text of the dialogue', example: 'Salut les amis !' })
  @IsString()
  @IsNotEmpty()
  replica: string;
}