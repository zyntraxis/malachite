import Card from "./Card/Card";
import "./CourseContent.css"

const CourseContent = () => {
    return (
        <div className="course-content">
            <div className="course-content__left">
                <h3 className="course-content__left__title">Basic Courses</h3>
                <p className="course-content__left__descr">These are the key courses of the training track that must be completed to the end.</p>
            </div>
            <div className="course-content__right">
                <Card title="Crystals Explained" videoCount={44} testCount={7} isCompleted={false} image="/crystals.png" />
                <Card title="Subconscious Reprogramming" videoCount={76} testCount={4} isCompleted={true} image="/subconscious.png" />
                <Card title="Occultism Explained" videoCount={27} testCount={5} isCompleted={false} image="/occultism.png" />
                <Card title="Chakras Eexplained" videoCount={96} testCount={19} isCompleted={false} image="/chakras.png" />
            </div>
        </div>
    )
};

export default CourseContent;