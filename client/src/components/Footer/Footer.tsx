import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__left">
                <a href="/" className="footer__logo__text">
                    <img src="/logo.png" className="footer__logo" />
                    Malachite
                </a>
                <h4 className="footer__left__title">Follow us</h4>
                <ul className="footer__left__list">
                    <div>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">Discord</a>
                        </li>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">Twitter</a>
                        </li>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">Bluesky</a>
                        </li>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">Threads</a>
                        </li>
                    </div>
                    <div>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">Mastodon</a>
                        </li>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">YouTube</a>
                        </li>
                        <li className="footer__left__item">
                            <a href="#" className="footer__left__link">GitHub</a>
                        </li>
                    </div>
                </ul>
                <span className="footer__copyright">© 2025 Malachite</span>
            </div>
            <div className="footer__right">
                <div className="footer__right__top">
                    <ul className="footer__right__list">
                        <h4 className="footer__right__title">Get started</h4>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Download</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Pricing</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Enterprise</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Account</a>
                        </li>
                    </ul>
                    <ul className="footer__right__list">
                        <h4 className="footer__right__title">Learn</h4>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Help</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Developers</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Changelog</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">About</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Roadmap</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Blog</a>
                        </li>
                    </ul>
                    <ul className="footer__right__list">
                        <h4 className="footer__right__title">Community</h4>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Join the community</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Discord</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Forum</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Merch store</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Brand guidelines</a>
                        </li>
                    </ul>
                </div>
                <div className="footer__right__bottom">
                    <ul className="footer__right__list">
                        <h4 className="footer__right__title">Malachite</h4>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Overview</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Sync</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Publish</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Canvas</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Mobile</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Web clipper</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Plugins</a>
                        </li>
                    </ul>
                    <ul className="footer__right__list">
                        <h4 className="footer__right__title">Resources</h4>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">System status</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">License overview</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Terms of service</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Privacy policy</a>
                        </li>
                        <li className="footer__right__item">
                            <a href="#" className="footer__right__link">Security</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Footer;