import "./CoursesSubHeader.css"
import { MdArrowBackIos } from "react-icons/md";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useState } from "react";

const CoursesSubHeader = () => {
    const [toggled, setToggled] = useState(false);

    const handleToggle = () => {
        setToggled(prev => !prev);
    };

    return (
        <div className="courses-sub-header">
            <div className="courses-sub-header__back">
                <MdArrowBackIos size={30} className="courses-sub-header__back__btn" />
                <span className="courses-sub-header__back__text">
                    Back
                </span>
            </div>
            <div
                className={`toggle-wrapper ${toggled ? "on" : "off"}`}
                onClick={handleToggle}
            >
                <span className="courses-sub-header__text">
                    Hide completed courses
                </span>
                {toggled ? <FaToggleOn size={30} /> : <FaToggleOff size={30} />}
            </div>
        </div>
    );
};

export default CoursesSubHeader;
