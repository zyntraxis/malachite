import Header from "./components/Header/Header";
import "./App.css"
import Banner from "./components/Banner/Banner";
import Shine from "./components/Shine/Shine";
import EnergyFigure from "./components/EnergyFigure/EnergyFigure";
import ShadowEchoes from "./components/ShadowEchoes /ShadowEchoes";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Banner />
            <Shine />
            <ShadowEchoes />
            <EnergyFigure />
        </div>
    );
};

export default App;