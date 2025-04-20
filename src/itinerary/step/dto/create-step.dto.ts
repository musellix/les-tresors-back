import { Type } from 'class-transformer';
import { IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDialogueDto } from '../../dialogue/dto/create-dialogue.dto';
import { IsStringOrEmpty } from 'src/common/validators/is-string-or-empty.validator';
import { LocationDto } from 'src/common/dto/location.dto';

export class CreateStepDto {
  @ApiProperty({ description: 'The title of the step', example: 'Step 1' })
  @IsStringOrEmpty()
  title: string;

  @ApiProperty({ description: 'The order of the step in the itinerary', example: 1 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'The location of the step', example: { latitude: 48.8566, longitude: 2.3522 } })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto | null = null;

  @ApiProperty({ description: 'The list of dialogues associated with the step', type: [CreateDialogueDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDialogueDto)
  dialogues: CreateDialogueDto[];
}