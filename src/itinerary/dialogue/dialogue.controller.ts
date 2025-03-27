import { Body, Controller, Post } from '@nestjs/common';
import { Dialogue } from './dialogue.entity';
import { CreateDialogueDto } from './create-dialogue.dto';
import { DialogueService } from './dialogue.service';

@Controller('dialogue')
export class DialogueController {

    constructor(private readonly dialogueService: DialogueService) {}

    @Post("/create")
    async createDialogue(@Body() body: CreateDialogueDto): Promise<Dialogue> {
        return this.dialogueService.createDialogue(body);
    }
}
