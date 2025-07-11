import Banner from "@/components/Banner/Banner";
import EnergyFigure from "@/components/EnergyFigure/EnergyFigure";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MalachiteAI from "@/components/MalachiteAI/MalachiteAI";
import Pricing from "@/components/Pricing/Pricing";
import ShadowEchoes from "@/components/ShadowEchoes /ShadowEchoes";
import Shine from "@/components/Shine/Shine";

const Landing = () => {
    return (
        <div className="landing">
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

export default Landing;