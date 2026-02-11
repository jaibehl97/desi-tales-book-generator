import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="brand-icon">📖</span>
                            <span className="brand-text">
                                <span className="brand-desi">Desi</span>
                                <span className="brand-tales">Tales</span>
                            </span>
                        </div>
                        <p className="footer-tagline">
                            The Heritage Engine — Transforming family memories into museum-quality heirlooms for the Indian Diaspora.
                        </p>
                    </div>
                    <div className="footer-links-group">
                        <div className="footer-col">
                            <h4>Products</h4>
                            <ul>
                                <li>My First Desi Adventure</li>
                                <li>Our Big Fat Diaspora Wedding</li>
                                <li>The Immigrant Hustle</li>
                                <li>Dadi's Kitchen & Life</li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li>About Us</li>
                                <li>Blog</li>
                                <li>Careers</li>
                                <li>Press Kit</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Desi Tales · The Heritage Engine</p>
                    <p className="footer-made">Made with ❤️ for the Diaspora</p>
                </div>
            </div>
        </footer>
    );
}
