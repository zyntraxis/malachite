import "./ShadowEchoes.css"

const ShadowEchoes = () => {
    return (
        <div className="shadow-echoes">
            <h2 className="shadow-echoes__title-section">Initiate Your Path</h2>
            <ul className="shadow-echoes__list">
                <li className="shadow-echoes__item">
                    <div className="shadow-echoes__badge">hard mode</div>
                    <div className="shadow-echoes__left">
                        <img src="/shadow-echoes.png" alt="Shadow Echoes" className="shadow-echoes__img" />
                    </div>
                    <div className="shadow-echoes__right">
                        <h2 className="shadow-echoes__title">BEFORE LIGHT — THERE WAS THE DARK.</h2>
                        <p className="shadow-echoes__descr">You cannot awaken until you meet the Shadow.
                            There are scars, fears, and a fire that sleeps inside you.</p>
                        <button className="shadow-echoes__btn">Enter the Shadow</button>
                    </div>
                </li>
                <li className="shadow-echoes__item">
                    <div className="shadow-echoes__badge">easy mode</div>
                    <div className="shadow-echoes__left">
                        <img src="/shadow-echoes2.png" alt="Shadow Echoes 2" className="shadow-echoes__img" />
                    </div>
                    <div className="shadow-echoes__right">
                        <h2 className="shadow-echoes__title">BEFORE DARK — THERE WAS THE LIGHT</h2>
                        <p className="shadow-echoes__descr">You cannot truly shine until you embrace the Light.
                            There is healing, hope, and a quiet radiance that lives within you.
                        </p>
                        <button className="shadow-echoes__btn">Enter the Light</button>
                    </div>
                </li>
            </ul>

        </div>
    )
};

export default ShadowEchoes;