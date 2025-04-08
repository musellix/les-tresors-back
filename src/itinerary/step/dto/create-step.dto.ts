import { Type } from 'class-transformer';
import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDialogueDto } from '../../dialogue/dto/create-dialogue.dto';
import { IsStringOrEmpty } from 'src/common/validators/is-string-or-empty.validator';

export class CreateStepDto {
  @ApiProperty({ description: 'The title of the step', example: 'Step 1' })
  @IsStringOrEmpty()
  title: string;

  @ApiProperty({ description: 'The order of the step in the itinerary', example: 1 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'The list of dialogues associated with the step', type: [CreateDialogueDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDialogueDto)
  dialogues: CreateDialogueDto[];
}