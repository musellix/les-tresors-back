import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDialogueDto } from '../../dialogue/dto/create-dialogue.dto';

export class CreateStepDto {
  @ApiProperty({ description: 'The title of the step', example: 'Step 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The ID of the associated itinerary', example: 1 })
  @IsNumber()
  itineraryId: number;

  @ApiProperty({ description: 'The order of the step in the itinerary', example: 1 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'The list of dialogues associated with the step', type: [CreateDialogueDto] })
  @IsArray()
  @Type(() => CreateDialogueDto)
  dialogues: CreateDialogueDto[];
}