import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ProfessionModule } from "./profession/profession.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseModule } from './course/course.module';
import { MalachiteAiModule } from './malachite-ai/malachite-ai.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ProfessionModule,
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "zyntraxis",
            password: "anubis9878",
            database: "malachite",
            autoLoadEntities: true,
            synchronize: true,
        }),
        CourseModule,
        MalachiteAiModule,
    ],
})
export class AppModule { }
