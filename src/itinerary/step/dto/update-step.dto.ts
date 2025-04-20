import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsArray, IsInt, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateDialogueDto } from 'src/itinerary/dialogue/dto/update-dialogue.dto';
import { IsStringOrEmpty } from 'src/common/validators/is-string-or-empty.validator';
import { LocationDto } from 'src/common/dto/location.dto';

export class UpdateStepDto {
  @ApiProperty({ description: "The ID of the itinerary to update", example: 1 })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({ description: 'The title of the step', example: 'Step 1' })
  @IsStringOrEmpty()
  title: string;

  @ApiProperty({ description: 'The ID of the associated itinerary', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  itineraryId: number;

  @ApiProperty({ description: 'The order of the step in the itinerary', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ description: 'The location of the step', example: { latitude: 48.8566, longitude: 2.3522 } })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto | null = null;

  @ApiProperty({ description: 'The list of dialogues associated with the step', type: [UpdateDialogueDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDialogueDto)
  dialogues: UpdateDialogueDto[];
}