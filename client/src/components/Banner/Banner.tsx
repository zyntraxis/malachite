import "./Banner.css"

const Banner = () => {
    return (
        <div className="banner">
            <div>
                <h1 className="banner__title">Awakening starts here.</h1>
                <p className="banner__descr">This is where deep transformation begins, where fears surface, masks burn away.</p>
                <div className="banner__btns">
                    <button className="banner__btn">Enter the Darkness</button>
                    <button className="banner__btn">Enter Quietly</button>
                </div>
            </div>
            <img src="/banner.png" alt="Banner image lotus" className="banner__image" />
        </div>
    );
};

export default Banner;