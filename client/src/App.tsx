import Header from "./components/Header/Header";
import "./App.css"
import Banner from "./components/Banner/Banner";
import Shine from "./components/Shine/Shine";
import EnergyFigure from "./components/EnergyFigure/EnergyFigure";
import ShadowEchoes from "./components/ShadowEchoes /ShadowEchoes";
import Pricing from "./components/Pricing/Pricing";
import MalachiteAI from "./components/MalachiteAI/MalachiteAI";
import Footer from "./components/Footer/Footer";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Banner />
            <EnergyFigure />
            <ShadowEchoes />
            <Shine />
            <Pricing />
            <MalachiteAI />
            <Footer />
        </div>
    );
};

export default App;