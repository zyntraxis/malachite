import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './entity/course.entity';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Get("findAll")
    async findAll(): Promise<Course[]> {
        return await this.courseService.findAll();
    }

    @Get("find/:id")
    async findById(@Param("id") id: string): Promise<Course | null> {
        return await this.courseService.findById(Number(id));
    }

    @Post("create")
    async create(@Body() course: Partial<Course>): Promise<Course> {
        return await this.courseService.create(course);
    }

    @Delete("remove/:id")
    async remove(@Param("id") id: string): Promise<void> {
        return this.courseService.remove(Number(id));
    }
}