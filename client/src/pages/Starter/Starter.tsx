import Header from "@/components/Header/Header";
import "./Starter.css"
import CoursesSubHeader from "@/components/CoursesSubHeader/CoursesSubHeader";
import CourseBanner from "@/components/CourseBanner/CourseBanner";
import CourseContent from "@/components/CourseContent/CourseContent";
import Footer from "@/components/Footer/Footer";

const Starter = () => {
    return (
        <div className="starter">
            <div className="starter__header">
                <Header />
                <CoursesSubHeader />
                <CourseBanner type="Profession" title="Basic Meditation Skills" descr="Learn simple meditation techniques to calm your mind, improve focus, and reduce stress. This beginner course helps you build a daily practice for better mental clarity and relaxation." image="/meditation.png" />
            </div>
            <div className="starter__content">
                <CourseContent />
            </div>
            <div className="starter__footer">
                <Footer />
            </div>
        </div>
    );
};

export default Starter;
