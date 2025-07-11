import "./App.css";
import Landing from "./pages/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import Starter from "./pages/Starter/Starter";

const App = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/starter" element={<Starter />} />
            </Routes>
        </div>
    );
};

export default App;