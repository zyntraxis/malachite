import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
    constructor(@InjectRepository(Course) private courseRepository: Repository<Course>) { }

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find();
    }

    async findById(id: number): Promise<Course | null> {
        return await this.courseRepository.findOneBy({ id });
    }

    async create(course: Partial<Course>): Promise<Course> {
        const newCourse = this.courseRepository.create(course);
        return await this.courseRepository.save(newCourse);
    }

    async remove(id: number): Promise<void> {
        await this.courseRepository.delete(id);
    }
}