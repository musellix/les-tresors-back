import { Body, Controller, Post } from '@nestjs/common';
import { Dialogue } from './dialogue.entity';
import { CreateDialogueDto } from './create-dialogue.dto';
import { DialogueService } from './dialogue.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Dialogue')
@Controller('dialogue')
export class DialogueController {

  constructor(private readonly dialogueService: DialogueService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a new dialogue' })
  @ApiBody({ type: CreateDialogueDto }) 
  @ApiResponse({ status: 201, description: 'Dialogue created successfully', type: Dialogue}) 
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createDialogue(@Body() body: CreateDialogueDto): Promise<Dialogue> {
    return this.dialogueService.createDialogue(body);
  }
}
