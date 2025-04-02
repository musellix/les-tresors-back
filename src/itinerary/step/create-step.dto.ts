import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
import { CreateDialogueDto } from '../dialogue/create-dialogue.dto';

export class CreateStepDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  itineraryId: number;

  @IsNumber()
  orderId: number;

  @IsArray()
  @Type(() => CreateDialogueDto)
  dialogues: CreateDialogueDto[];
}
