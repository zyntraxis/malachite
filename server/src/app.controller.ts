import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Post('ask')
    async ask(@Body('message') message: string) {
        return this.appService.askAI(message);
    }
}
