import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DialogueType } from '../dialogue.entity';

export class CreateDialogueDto {
  @ApiProperty({ description: 'The order of the dialog in the step', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: 'The type of the dialogue', enum: DialogueType, example: DialogueType.INFORMATION })
  @IsEnum(DialogueType)
  @IsNotEmpty()
  dialogueType: DialogueType;

  @ApiProperty({ description: 'The ID of the korrigan speaking', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  korriganId: number;

  @ApiProperty({ description: 'The text of the dialogue', example: 'Salut les amis !' })
  @IsString()
  @IsNotEmpty()
  replica: string;
}