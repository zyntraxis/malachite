import { useEffect, useState } from "react";
import Card from "./Card/Card";
import "./CourseContent.css"
import type { Course } from "@/types/Professions";

const CourseContent = ({ courses }: Course[] | unknown) => {
    return (
        <div className="course-content">
            <div className="course-content__left">
                <h3 className="course-content__left__title">Basic Courses</h3>
                <p className="course-content__left__descr">These are the key courses of the training track that must be completed to the end.</p>
            </div>
            <div className="course-content__right">
                {courses && courses.map((course: Course) => (
                    <Card title={course.title} videoCount={course.materialCount} testCount={course.testCount} isCompleted={course.progress === 100 ? true : false} image={`/${course.image}`} />
                ))}
            </div>
        </div>
    )
};

export default CourseContent;