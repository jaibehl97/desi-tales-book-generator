import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleBook } from '../data/sample-book';
import Footer from '../components/Footer';
import './Preview.css';

export default function Preview() {
    const navigate = useNavigate();
    const [activeChapter, setActiveChapter] = useState(0);

    const chapter = sampleBook.chapters[activeChapter];

    return (
        <div className="preview-page">
            <div className="preview-hero">
                <div className="container">
                    <div className="preview-hero-content animate-fade-in-up">
                        <div className="book-badge">📖 Preview</div>
                        <h1>{sampleBook.title}</h1>
                        <p className="preview-subtitle">{sampleBook.subtitle}</p>
                        <div className="book-meta">
                            <span className="meta-item">🪷 {sampleBook.metadata.tone}</span>
                            <span className="meta-divider">·</span>
                            <span className="meta-item">🎨 {sampleBook.metadata.imageStyle}</span>
                            <span className="meta-divider">·</span>
                            <span className="meta-item">📄 {sampleBook.metadata.pageCount} pages</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preview-body container">
                <div className="preview-layout">
                    {/* Chapter Sidebar */}
                    <aside className="chapter-sidebar">
                        <h3 className="sidebar-title">Chapters</h3>
                        {sampleBook.chapters.map((ch, i) => (
                            <div
                                key={ch.number}
                                className={`chapter-nav-item ${i === activeChapter ? 'active' : ''}`}
                                onClick={() => setActiveChapter(i)}
                            >
                                <span className="ch-num">Ch. {ch.number}</span>
                                <span className="ch-title">{ch.title}</span>
                            </div>
                        ))}
                        <div className="sidebar-characters">
                            <h3 className="sidebar-title">Characters</h3>
                            {sampleBook.characters.map(c => (
                                <div key={c.name} className="char-item">
                                    <span className="char-avatar">{c.avatar}</span>
                                    <div>
                                        <span className="char-name">{c.name}</span>
                                        <span className="char-role">{c.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Book Reader */}
                    <main className="book-reader">
                        <div className="chapter-card card animate-fade-in" key={activeChapter}>
                            <div className="chapter-header">
                                <span className="chapter-label">Chapter {chapter.number}</span>
                                <h2 className="chapter-title">{chapter.title}</h2>
                                <p className="chapter-summary">{chapter.summary}</p>
                            </div>

                            {/* Image Placeholder */}
                            <div className="illustration-card">
                                <div className="illustration-inner">
                                    <span className="illust-icon">🎨</span>
                                    <span className="illust-label">Illustration</span>
                                    <p className="illust-notes">{chapter.imageNotes}</p>
                                </div>
                            </div>

                            <div className="chapter-text">
                                {chapter.content.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            {/* Chapter Navigation */}
                            <div className="chapter-nav-buttons">
                                {activeChapter > 0 && (
                                    <button className="btn btn-outline" onClick={() => setActiveChapter(a => a - 1)}>
                                        ← Previous Chapter
                                    </button>
                                )}
                                <div style={{ flex: 1 }} />
                                {activeChapter < sampleBook.chapters.length - 1 ? (
                                    <button className="btn btn-dark" onClick={() => setActiveChapter(a => a + 1)}>
                                        Next Chapter →
                                    </button>
                                ) : (
                                    <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')}>
                                        Order Your Book ✨
                                    </button>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
