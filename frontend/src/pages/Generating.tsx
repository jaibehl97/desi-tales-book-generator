import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentSteps, sampleBook } from '../data/sample-book';
import './Generating.css';

export default function Generating() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [streamText, setStreamText] = useState('');
    const [completed, setCompleted] = useState(false);
    const streamRef = useRef<HTMLDivElement>(null);

    // Simulate agent pipeline
    useEffect(() => {
        if (currentStep >= agentSteps.length) {
            setCompleted(true);
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStep(s => s + 1);
        }, agentSteps[currentStep].duration);

        return () => clearTimeout(timer);
    }, [currentStep]);

    // Simulate streaming text for chapter writing steps
    useEffect(() => {
        const step = agentSteps[currentStep];
        if (!step || !step.id.startsWith('chapter')) return;

        const chapterIndex = parseInt(step.id.replace('chapter', '')) - 1;
        const chapter = sampleBook.chapters[chapterIndex];
        if (!chapter) return;

        const text = chapter.content;
        let charIndex = 0;
        setStreamText('');

        const interval = setInterval(() => {
            if (charIndex < text.length) {
                setStreamText(text.substring(0, charIndex + 1));
                charIndex++;
                if (streamRef.current) {
                    streamRef.current.scrollTop = streamRef.current.scrollHeight;
                }
            } else {
                clearInterval(interval);
            }
        }, 12);

        return () => clearInterval(interval);
    }, [currentStep]);

    const progress = Math.round((currentStep / agentSteps.length) * 100);

    return (
        <div className="generating-page">
            <div className="generating-container">
                {!completed ? (
                    <>
                        <div className="gen-header animate-fade-in-up">
                            <div className="gen-icon animate-float">📖</div>
                            <h1>Crafting Your Book</h1>
                            <p className="gen-subtitle">
                                Seven specialist AI agents are collaborating to transform your memories into a masterpiece.
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="gen-progress-bar">
                            <div className="gen-progress-fill" style={{ width: `${progress}%` }} />
                            <span className="gen-progress-label">{progress}%</span>
                        </div>

                        {/* Agent Pipeline */}
                        <div className="agent-pipeline">
                            {agentSteps.map((step, i) => (
                                <div
                                    key={step.id}
                                    className={`agent-node ${i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending'}`}
                                >
                                    <div className="agent-icon-wrap">
                                        <span className="agent-icon">{step.icon}</span>
                                        {i === currentStep && <div className="agent-pulse" />}
                                    </div>
                                    <div className="agent-info">
                                        <span className="agent-name">{step.name}</span>
                                        <span className="agent-desc">{step.description}</span>
                                    </div>
                                    <div className="agent-status">
                                        {i < currentStep && <span className="status-done">✓</span>}
                                        {i === currentStep && <span className="status-active"><div className="spinner" /></span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Streaming Text Preview */}
                        {streamText && (
                            <div className="stream-preview" ref={streamRef}>
                                <div className="stream-header">
                                    <span className="stream-badge">✍️ Live Preview</span>
                                    <span className="stream-cursor" />
                                </div>
                                <p className="stream-text">{streamText}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="gen-complete animate-fade-in-up">
                        <div className="complete-icon">🎉</div>
                        <h1>Your Book is Ready!</h1>
                        <p>All 7 agents have finished their work. Your museum-quality heirloom awaits.</p>
                        <div className="complete-stats">
                            <div className="c-stat">
                                <span className="c-stat-num">3</span>
                                <span className="c-stat-label">Chapters</span>
                            </div>
                            <div className="c-stat">
                                <span className="c-stat-num">48</span>
                                <span className="c-stat-label">Pages</span>
                            </div>
                            <div className="c-stat">
                                <span className="c-stat-num">9</span>
                                <span className="c-stat-label">Illustrations</span>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/preview')}>
                            Preview Your Book →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
