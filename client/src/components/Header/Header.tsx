import "./Header.css"

const Header = () => {
    return (
        <header className="header">
            <ul className="header__list">
                <li className="header__item">
                    <a href="/" className="header__logo__text">
                        <img src="/logo.png" className="header__logo" />
                        Malachite
                    </a>
                </li>
                <li className="header__item">
                    <a href="#" className="header__link">Download</a>
                </li>
                <li className="header__item">
                    <a href="#" className="header__link">Pricing</a>
                </li>
                <li className="header__item">
                    <a href="#" className="header__link">Sync</a>
                </li>
                <li className="header__item">
                    <a href="#" className="header__link">Publish</a>
                </li>
                <li className="header__item">
                    <a href="#" className="header__link">Enterprise</a>
                </li>
            </ul>

            <ul className="header__list">
                <li className="header__item">
                    <a href="#" className="header__link">Community</a>
                </li>
                <li className="header__item">
                    <a href="#" className="header__link">Account</a>
                </li>
            </ul>
        </header>
    )
}

export default Header;