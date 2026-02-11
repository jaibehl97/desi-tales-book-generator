import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isHome ? 'navbar-home' : 'navbar-solid'}`}>
            <div className="navbar-inner container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">✦</span>
                    <span className="brand-text">
                        <span className="brand-desi">Desi</span>
                        <span className="brand-tales">Tales</span>
                    </span>
                </Link>
                <div className="navbar-links">
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                    <Link to="/create" className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}>Create</Link>
                    <Link to="/preview" className={`nav-link ${location.pathname === '/preview' ? 'active' : ''}`}>Preview</Link>
                    <Link to="/create" className="btn btn-primary btn-nav">Create a Story</Link>
                </div>
            </div>
        </nav>
    );
}
