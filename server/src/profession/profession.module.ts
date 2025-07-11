import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profession } from './entity/profession.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Profession])],
    providers: [ProfessionService],
    controllers: [ProfessionController]
})
export class ProfessionModule { }
