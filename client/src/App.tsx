import "./App.css";
import Landing from "./pages/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import ProfessionPage from "./pages/ProfessionPage/ProfessionPage";

const App = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/profession/:id" element={<ProfessionPage />} />
            </Routes>
        </div>
    );
};

export default App;