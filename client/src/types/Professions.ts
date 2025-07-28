interface Profession {
    id: number;
    title: string;
    description: string;
    progress: number;
    image: string;
    courses: number[];
}

interface Course {
    title: string;
    description: string;
    progress: number;
    image: string;
    materialCount: number;
    testCount: number;
    modules: number[];
}

export type { Profession };
export type { Course };