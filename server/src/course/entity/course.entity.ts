import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    progress: number;

    @Column()
    image: string;

    @Column()
    materialCount: number;

    @Column()
    testCount: number;

    @Column("int", { array: true })
    modules: number[];
}