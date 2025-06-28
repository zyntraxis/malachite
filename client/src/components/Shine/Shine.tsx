import "./Shine.css"

const Shine = () => {
    return (
        <div className="shine">
            <h2 className="shine__title">It's your time to shine.</h2>
            <button className="shine__btn">Discover</button>
            <ul className="shine__list">
                <li className="shine__item">
                    <h3 className="shine__item__title">
                        Join us on Telegram
                    </h3>
                    <p className="shine__item__descr">Get help, ask questions, meet other Malachite users, and learn about their experience.</p>
                </li>
                <li className="shine__item">
                    <h3 className="shine__item__title">
                        Discussion forum
                    </h3>
                    <p className="shine__item__descr">Share your wins, struggles, or questions — we’ll work through them together with focus, depth, and clarity.</p>
                </li>
                <li className="shine__item">
                    <h3 className="shine__item__title">
                        Esoteric docs
                    </h3>
                    <p className="shine__item__descr">Learn how to use Malachite effectively, follow our best practices, and master every step of the workflow.</p>
                </li>
            </ul>
        </div>
    )
};

export default Shine;
