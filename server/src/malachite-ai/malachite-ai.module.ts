import { Module } from '@nestjs/common';
import { MalachiteAiService } from './malachite-ai.service';
import { MalachiteAiController } from './malachite-ai.controller';

@Module({
  providers: [MalachiteAiService],
  controllers: [MalachiteAiController]
})
export class MalachiteAiModule {}
