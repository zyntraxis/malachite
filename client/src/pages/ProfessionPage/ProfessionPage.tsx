import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Profession, Course } from "@/types/Professions";
import Card from "@/components/CourseContent/Card/Card";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./ProfessionPage.css";
import CoursesSubHeader from "@/components/CoursesSubHeader/CoursesSubHeader";
import CourseBanner from "@/components/CourseBanner/CourseBanner";
import CourseContent from "@/components/CourseContent/CourseContent";

const ProfessionPage = () => {
    const { id } = useParams<{ id: string }>();
    const [profession, setProfession] = useState<Profession | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchProfession = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/profession/find/${id}`);
                setProfession(response.data);

                const courseIds = response.data.courses;
                const courseRequests = courseIds.map((courseId: number) =>
                    axios.get(`http://localhost:3000/course/find/${courseId}`)
                );

                const courseResponses = await Promise.all(courseRequests);
                setCourses(courseResponses.map(res => res.data));
            } catch (e) {
                console.error("Error loading profession or courses", e);
            }
        };

        fetchProfession();
    }, [id]);

    return (
        <div className="profession-page">
            <Header />
            <CoursesSubHeader />
            {profession && (
                <CourseBanner type="Profession" title={profession.title} descr={profession.description} image={`/${profession.image}`} progress={profession.progress}/>
            )}

            <CourseContent courses={courses} />
            <Footer />
        </div>
    );
};

export default ProfessionPage;
