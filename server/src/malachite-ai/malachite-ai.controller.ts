import { Body, Controller, Post } from '@nestjs/common';
import { MalachiteAiService } from './malachite-ai.service';

@Controller('malachite-ai')
export class MalachiteAiController {
    constructor(private readonly malachiteAIService: MalachiteAiService) { }

    @Post('ask')
    async ask(@Body('message') message: string) {
        return this.malachiteAIService.askAI(message);
    }
}