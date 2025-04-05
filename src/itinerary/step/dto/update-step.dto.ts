import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateDialogueDto } from 'src/itinerary/dialogue/dto/update-dialogue.dto';

export class UpdateStepDto {
  @ApiProperty({ description: "The ID of the itinerary to update", example: 1 })
  @IsNotEmpty()
  @IsInt()
  id: number;

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

  @ApiProperty({ description: 'The list of dialogues associated with the step', type: [UpdateDialogueDto] })
  @IsArray()
  @Type(() => UpdateDialogueDto)
  dialogues: UpdateDialogueDto[];
}