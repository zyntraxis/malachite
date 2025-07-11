import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profession } from './entity/profession.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessionService {
    constructor(@InjectRepository(Profession) private professionRepository: Repository<Profession>) { }

    async findAll(): Promise<Profession[]> {
        return await this.professionRepository.find();
    }

    async findById(id: number): Promise<Profession | null> {
        return await this.professionRepository.findOneBy({ id });
    }

    async create(profession: Partial<Profession>): Promise<Profession> {
        const newProfession = this.professionRepository.create(profession);
        return await this.professionRepository.save(newProfession);
    }

    async remove(id: number): Promise<void> {
        await this.professionRepository.delete(id);
    }
}
