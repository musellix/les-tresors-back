import { Body, Controller, Post } from '@nestjs/common';
import { Dialogue } from './dialogue.entity';
import { CreateDialogueDto } from './dto/create-dialogue.dto';
import { DialogueService } from './dialogue.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Dialogue')
@Controller('dialogue')
export class DialogueController {

  constructor(private readonly dialogueService: DialogueService) {}

}
