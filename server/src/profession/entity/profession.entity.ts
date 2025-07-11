import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profession {
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
    category: string;

    @Column("int", { array: true })
    courses: number[];
}