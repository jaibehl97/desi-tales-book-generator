import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lifeStages } from '../data/sample-book';
import './Builder.css';

type LifeStage = 'newParent' | 'couple' | 'founder' | 'elder';
type Tone = 'whimsical' | 'nostalgic' | 'inspirational' | 'celebratory';
type ImageStyle = 'realistic' | 'illustrated' | 'mixed';
type TargetLength = 'short' | 'medium' | 'long';

interface Memory {
    title: string;
    description: string;
    dateRange: string;
    people: string;
    location: string;
}

interface Character {
    name: string;
    relationship: string;
    keyTraits: string;
    visualDescription: string;
}

const STEPS = [
    { id: 1, label: 'Life Stage' },
    { id: 2, label: 'Memories' },
    { id: 3, label: 'Characters' },
    { id: 4, label: 'Culture' },
    { id: 5, label: 'Style' },
];

const tones: { value: Tone; label: string; icon: string }[] = [
    { value: 'whimsical', label: 'Whimsical', icon: '🌈' },
    { value: 'nostalgic', label: 'Nostalgic', icon: '📷' },
    { value: 'inspirational', label: 'Inspirational', icon: '⭐' },
    { value: 'celebratory', label: 'Celebratory', icon: '🎉' },
];

const imageStyles: { value: ImageStyle; label: string; icon: string }[] = [
    { value: 'illustrated', label: 'Illustrated', icon: '🎨' },
    { value: 'realistic', label: 'Realistic', icon: '📸' },
    { value: 'mixed', label: 'Mixed Media', icon: '✨' },
];

const lengths: { value: TargetLength; label: string; pages: string }[] = [
    { value: 'short', label: 'Picture Book', pages: '40–80 pages' },
    { value: 'medium', label: 'Story Book', pages: '80–120 pages' },
    { value: 'long', label: 'Full Novel', pages: '120–200 pages' },
];

export default function Builder() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [lifeStage, setLifeStage] = useState<LifeStage | null>(null);

    const [memories, setMemories] = useState<Memory[]>([{
        title: '', description: '', dateRange: '', people: '', location: ''
    }]);

    const [characters, setCharacters] = useState<Character[]>([{
        name: '', relationship: '', keyTraits: '', visualDescription: ''
    }]);

    const [culture, setCulture] = useState({
        primaryRegion: '',
        festivals: '',
        foods: '',
        traditions: ''
    });

    const [tone, setTone] = useState<Tone>('whimsical');
    const [imageStyle, setImageStyle] = useState<ImageStyle>('illustrated');
    const [targetLength, setTargetLength] = useState<TargetLength>('short');

    const next = () => setStep(s => Math.min(s + 1, 5));
    const back = () => setStep(s => Math.max(s - 1, 1));

    const handleGenerate = () => {
        navigate('/generating');
    };

    const addMemory = () => {
        setMemories(m => [...m, { title: '', description: '', dateRange: '', people: '', location: '' }]);
    };

    const updateMemory = (index: number, field: keyof Memory, value: string) => {
        setMemories(m => m.map((mem, i) => i === index ? { ...mem, [field]: value } : mem));
    };

    const addCharacter = () => {
        setCharacters(c => [...c, { name: '', relationship: '', keyTraits: '', visualDescription: '' }]);
    };

    const updateCharacter = (index: number, field: keyof Character, value: string) => {
        setCharacters(c => c.map((char, i) => i === index ? { ...char, [field]: value } : char));
    };

    const canProceed = () => {
        switch (step) {
            case 1: return lifeStage !== null;
            case 2: return memories[0]?.title.trim() !== '';
            case 3: return characters[0]?.name.trim() !== '';
            case 4: return culture.primaryRegion.trim() !== '';
            default: return true;
        }
    };

    return (
        <div className="builder-page">
            <div className="builder-container">
                {/* Step Indicator */}
                <div className="step-indicator">
                    {STEPS.map((s) => (
                        <div
                            key={s.id}
                            className={`step-dot ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}
                            onClick={() => s.id < step && setStep(s.id)}
                        >
                            <div className="dot">
                                {step > s.id ? '✓' : s.id}
                            </div>
                            <span className="step-label">{s.label}</span>
                        </div>
                    ))}
                    <div className="step-progress-bar">
                        <div className="step-progress-fill" style={{ width: `${((step - 1) / 4) * 100}%` }} />
                    </div>
                </div>

                {/* Step Content */}
                <div className="step-content animate-fade-in" key={step}>
                    {/* STEP 1: Life Stage */}
                    {step === 1 && (
                        <div className="step-panel">
                            <h2>What's your story about?</h2>
                            <p className="step-subtitle">Choose the life stage that best fits your book.</p>
                            <div className="life-stage-grid">
                                {lifeStages.map((stage) => (
                                    <div
                                        key={stage.id}
                                        className={`life-stage-option ${lifeStage === stage.id ? 'selected' : ''}`}
                                        style={{ '--stage-color': stage.color } as React.CSSProperties}
                                        onClick={() => setLifeStage(stage.id)}
                                    >
                                        <div className="ls-emoji">{stage.emoji}</div>
                                        <div className="ls-info">
                                            <h3>{stage.title}</h3>
                                            <p>{stage.tagline}</p>
                                        </div>
                                        <div className="ls-check">
                                            {lifeStage === stage.id && '✓'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Memories */}
                    {step === 2 && (
                        <div className="step-panel">
                            <h2>Share Your Memories</h2>
                            <p className="step-subtitle">These are the raw ingredients our AI will weave into your story.</p>
                            {memories.map((mem, i) => (
                                <div key={i} className="memory-card card">
                                    <div className="memory-header">
                                        <span className="memory-num">Memory {i + 1}</span>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group full-width">
                                            <label className="label">Memory Title *</label>
                                            <input className="input" placeholder="e.g. Ayaan's First Diwali" value={mem.title}
                                                onChange={e => updateMemory(i, 'title', e.target.value)} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label className="label">Description *</label>
                                            <textarea className="input" placeholder="Describe this memory in detail..."
                                                value={mem.description} onChange={e => updateMemory(i, 'description', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="label">When</label>
                                            <input className="input" placeholder="e.g. November 2025" value={mem.dateRange}
                                                onChange={e => updateMemory(i, 'dateRange', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Where</label>
                                            <input className="input" placeholder="e.g. London, UK" value={mem.location}
                                                onChange={e => updateMemory(i, 'location', e.target.value)} />
                                        </div>
                                        <div className="form-group full-width">
                                            <label className="label">People Involved</label>
                                            <input className="input" placeholder="e.g. Ayaan, Dadi, Pooja, Rahul" value={mem.people}
                                                onChange={e => updateMemory(i, 'people', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-outline add-btn" onClick={addMemory}>+ Add Another Memory</button>
                        </div>
                    )}

                    {/* STEP 3: Characters */}
                    {step === 3 && (
                        <div className="step-panel">
                            <h2>Who's in Your Story?</h2>
                            <p className="step-subtitle">Tell us about the people who make your story come alive.</p>
                            {characters.map((char, i) => (
                                <div key={i} className="memory-card card">
                                    <div className="memory-header">
                                        <span className="memory-num">Character {i + 1}</span>
                                    </div>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label className="label">Name *</label>
                                            <input className="input" placeholder="e.g. Ayaan" value={char.name}
                                                onChange={e => updateCharacter(i, 'name', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Relationship</label>
                                            <input className="input" placeholder="e.g. Son, Grandmother" value={char.relationship}
                                                onChange={e => updateCharacter(i, 'relationship', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Key Traits</label>
                                            <input className="input" placeholder="e.g. curious, joyful" value={char.keyTraits}
                                                onChange={e => updateCharacter(i, 'keyTraits', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="label">Visual Description</label>
                                            <input className="input" placeholder="e.g. Baby with big eyes" value={char.visualDescription}
                                                onChange={e => updateCharacter(i, 'visualDescription', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-outline add-btn" onClick={addCharacter}>+ Add Another Character</button>
                        </div>
                    )}

                    {/* STEP 4: Culture */}
                    {step === 4 && (
                        <div className="step-panel">
                            <h2>Your Cultural Heritage</h2>
                            <p className="step-subtitle">The flavors, festivals, and traditions that define your family.</p>
                            <div className="culture-form card">
                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label className="label">Primary Region / Community *</label>
                                        <input className="input" placeholder="e.g. Punjab, Gujarat, Tamil Nadu, Bengali" value={culture.primaryRegion}
                                            onChange={e => setCulture(c => ({ ...c, primaryRegion: e.target.value }))} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label className="label">Festivals & Ceremonies</label>
                                        <input className="input" placeholder="e.g. Diwali, Holi, Namkaran, Lohri" value={culture.festivals}
                                            onChange={e => setCulture(c => ({ ...c, festivals: e.target.value }))} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label className="label">Foods</label>
                                        <input className="input" placeholder="e.g. Gulab Jamun, Biryani, Dal Makhani" value={culture.foods}
                                            onChange={e => setCulture(c => ({ ...c, foods: e.target.value }))} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label className="label">Traditions & Customs</label>
                                        <input className="input" placeholder="e.g. Rangoli, Mehndi, Naming in ear" value={culture.traditions}
                                            onChange={e => setCulture(c => ({ ...c, traditions: e.target.value }))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: Style */}
                    {step === 5 && (
                        <div className="step-panel">
                            <h2>Set the Mood</h2>
                            <p className="step-subtitle">Choose the tone, art style, and length for your book.</p>

                            <div className="style-section">
                                <h3>Tone</h3>
                                <div className="style-options">
                                    {tones.map(t => (
                                        <div key={t.value} className={`style-option ${tone === t.value ? 'selected' : ''}`}
                                            onClick={() => setTone(t.value)}>
                                            <span className="so-icon">{t.icon}</span>
                                            <span className="so-label">{t.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="style-section">
                                <h3>Art Style</h3>
                                <div className="style-options">
                                    {imageStyles.map(s => (
                                        <div key={s.value} className={`style-option ${imageStyle === s.value ? 'selected' : ''}`}
                                            onClick={() => setImageStyle(s.value)}>
                                            <span className="so-icon">{s.icon}</span>
                                            <span className="so-label">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="style-section">
                                <h3>Book Length</h3>
                                <div className="length-options">
                                    {lengths.map(l => (
                                        <div key={l.value} className={`length-option ${targetLength === l.value ? 'selected' : ''}`}
                                            onClick={() => setTargetLength(l.value)}>
                                            <span className="lo-label">{l.label}</span>
                                            <span className="lo-pages">{l.pages}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="builder-nav">
                    {step > 1 && (
                        <button className="btn btn-outline" onClick={back}>← Back</button>
                    )}
                    <div style={{ flex: 1 }} />
                    {step < 5 ? (
                        <button className="btn btn-primary" onClick={next} disabled={!canProceed()}>
                            Continue →
                        </button>
                    ) : (
                        <button className="btn btn-primary btn-lg" onClick={handleGenerate}>
                            ✨ Generate My Book
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
