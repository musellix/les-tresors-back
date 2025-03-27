import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDialogueDto {
  @IsNumber()
  @IsNotEmpty()
  stepId: number;

  @IsNumber()
  @IsNotEmpty()
  character: number;

  @IsString()
  @IsNotEmpty()
  replica: string;
}
