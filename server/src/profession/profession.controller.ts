import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { Profession } from './entity/profession.entity';

@Controller('profession')
export class ProfessionController {
    constructor(private readonly professionService: ProfessionService) { }

    @Get("findAll")
    async findAll(): Promise<Profession[]> {
        return await this.professionService.findAll();
    }

    @Get("find/:id")
    async findById(@Param("id") id: string): Promise<Profession | null> {
        return await this.professionService.findById(Number(id));
    }

    @Post("create")
    async create(@Body() profession: Partial<Profession>): Promise<Profession> {
        return await this.professionService.create(profession);
    }

    @Delete("remove/:id")
    async remove(@Param("id") id: string): Promise<void> {
        return this.professionService.remove(Number(id));
    }
}