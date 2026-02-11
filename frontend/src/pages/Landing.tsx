import { useNavigate } from 'react-router-dom';
import { howItWorks, testimonials } from '../data/sample-book';
import Footer from '../components/Footer';
import './Landing.css';

const storyPaths = [
    {
        id: 'elder',
        title: "The Dadi/Nani Legacy",
        description: "An ancestral history adventure through your family's roots.",
        image: '/images/elder-legacy.png',
        emoji: '📖',
    },
    {
        id: 'newParent',
        title: 'How We Got Here',
        description: "The immigrant journey — from one home to a new world.",
        image: '/images/holi-family.png',
        emoji: '🌈',
    },
    {
        id: 'founder',
        title: 'Custom Mythologies',
        description: "Ancient tales retold with your child as the hero.",
        image: '/images/founder.png',
        emoji: '✨',
    },
    {
        id: 'couple',
        title: "Wedding 'Biodata' Parody",
        description: "The ultimate roast book for the happy couple.",
        image: '/images/wedding.png',
        emoji: '💍',
    },
];

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing">
            {/* === HERO === */}
            <section className="hero">
                <div className="hero-glow" />
                <div className="hero-inner container">
                    <div className="hero-text">
                        <div className="hero-badge animate-fade-in-up">
                            <span className="badge-dot" />
                            Personalized Children's Books
                        </div>
                        <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            A Story Where <em>Your Child</em> Is the Hero
                        </h1>
                        <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Create personalized, culturally-rich storybooks featuring your child. Celebrate festivals, traditions, and the magic of growing up — all through beautiful illustrated adventures.
                        </p>
                        <div className="hero-actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <button className="btn btn-primary btn-lg" onClick={() => navigate('/create')}>
                                Create Your Child's Story ✨
                            </button>
                            <button className="btn btn-outline-warm btn-lg" onClick={() => navigate('/preview')}>
                                Browse Themes
                            </button>
                        </div>
                    </div>
                    <div className="hero-image-wrap animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="hero-image-card">
                            <img src="/images/hero-child.png" alt="Child reading a magical storybook" className="hero-img" />
                        </div>
                        <div className="hero-social-proof">
                            <span className="stars">⭐⭐⭐⭐⭐</span>
                            <span>2,000+ happy families</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* === HOW IT WORKS === */}
            <section className="section how-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>How It Works</h2>
                        <p className="section-subtitle">Three simple steps to a magical keepsake</p>
                    </div>
                    <div className="how-grid stagger">
                        {howItWorks.map((step) => (
                            <div key={step.step} className="how-card">
                                <div className="how-icon-wrap">
                                    <div className="how-icon">{step.icon}</div>
                                </div>
                                <div className="how-step-label">Step {step.step}</div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === STORY PATHS === */}
            <section className="section paths-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Choose Your Story Path</h2>
                        <p className="section-subtitle">
                            Four unique paths — each celebrating a different facet of the desi experience
                        </p>
                    </div>
                    <div className="paths-grid stagger">
                        {storyPaths.map((path) => (
                            <div key={path.id} className="path-card" onClick={() => navigate('/create')}>
                                <div className="path-image-wrap">
                                    <img src={path.image} alt={path.title} className="path-image" />
                                </div>
                                <div className="path-info">
                                    <h3>{path.emoji} {path.title}</h3>
                                    <p>{path.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS === */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Loved by Families</h2>
                    </div>
                    <div className="testimonials-grid stagger">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="quote-icon">❝</div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-footer">
                                    <span className="testimonial-name">{t.name}</span>
                                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === FINAL CTA === */}
            <section className="final-cta-section">
                <div className="container text-center">
                    <div className="cta-card">
                        <h2>Ready to Create Magic?</h2>
                        <p>Every child deserves to see themselves as the hero of their own story.</p>
                        <button className="btn btn-cta btn-lg" onClick={() => navigate('/create')}>
                            Start Creating — It's Fun! 🎨
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
