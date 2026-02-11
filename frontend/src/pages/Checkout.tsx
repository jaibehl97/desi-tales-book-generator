import { useState } from 'react';
import { formats, sampleBook } from '../data/sample-book';
import Footer from '../components/Footer';
import './Checkout.css';

export default function Checkout() {
    const [selectedFormat, setSelectedFormat] = useState('hardcover');
    const [quantity, setQuantity] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const format = formats.find(f => f.id === selectedFormat)!;
    const total = format.price * quantity;

    const handleOrder = () => {
        setShowConfirmation(true);
    };

    return (
        <div className="checkout-page">
            <div className="checkout-container container">
                <div className="checkout-header animate-fade-in-up">
                    <h1>Complete Your Order</h1>
                    <p>Your heirloom is just a few clicks away.</p>
                </div>

                <div className="checkout-layout">
                    {/* Order Summary */}
                    <div className="order-summary card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="summary-title">Order Summary</h3>
                        <div className="book-summary">
                            <div className="book-cover-mini">
                                <span>📖</span>
                            </div>
                            <div className="book-info">
                                <h4>{sampleBook.title}</h4>
                                <p>{sampleBook.metadata.pageCount} pages · {sampleBook.chapters.length} chapters</p>
                                <div className="book-tags">
                                    <span className="tag">🪷 {sampleBook.metadata.tone}</span>
                                    <span className="tag">🎨 {sampleBook.metadata.imageStyle}</span>
                                </div>
                            </div>
                        </div>

                        {/* Format Selector */}
                        <div className="format-section">
                            <h4 className="format-title">Choose Your Format</h4>
                            {formats.map(f => (
                                <div
                                    key={f.id}
                                    className={`format-option ${selectedFormat === f.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedFormat(f.id)}
                                >
                                    <div className="format-radio">
                                        <div className={`radio-dot ${selectedFormat === f.id ? 'active' : ''}`} />
                                    </div>
                                    <div className="format-info">
                                        <div className="format-name">
                                            {f.icon} {f.name}
                                            {f.popular && <span className="popular-badge">Most Popular</span>}
                                        </div>
                                        <p className="format-desc">{f.description}</p>
                                    </div>
                                    <div className="format-price">${f.price}</div>
                                </div>
                            ))}
                        </div>

                        {/* Quantity */}
                        <div className="quantity-row">
                            <span className="qty-label">Quantity</span>
                            <div className="qty-controls">
                                <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                                <span className="qty-value">{quantity}</span>
                                <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                        </div>
                    </div>

                    {/* Payment Column */}
                    <div className="payment-column">
                        <div className="price-card card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="price-row">
                                <span>{format.name} × {quantity}</span>
                                <span>${format.price * quantity}</span>
                            </div>
                            <div className="price-row">
                                <span>Shipping</span>
                                <span className="free-shipping">FREE</span>
                            </div>
                            <div className="price-row total">
                                <span>Total</span>
                                <span className="total-price">${total}</span>
                            </div>
                            <button className="btn btn-primary btn-lg order-btn" onClick={handleOrder}>
                                Place Order ✨
                            </button>
                            <p className="secure-note">🔒 Secure payment · Ships in 5-7 days</p>
                        </div>

                        {/* Demo Payment Form */}
                        <div className="payment-form card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <h4>Payment Details</h4>
                            <p className="demo-badge">🎭 Demo Mode — No Real Charges</p>
                            <div className="form-group">
                                <label className="label">Cardholder Name</label>
                                <input className="input" placeholder="Priya Sharma" />
                            </div>
                            <div className="form-group">
                                <label className="label">Card Number</label>
                                <input className="input" placeholder="4242 4242 4242 4242" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="label">Expiry</label>
                                    <input className="input" placeholder="12/28" />
                                </div>
                                <div className="form-group">
                                    <label className="label">CVC</label>
                                    <input className="input" placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="confirmation-overlay" onClick={() => setShowConfirmation(false)}>
                    <div className="confirmation-modal animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        {/* Confetti */}
                        <div className="confetti-container">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="confetti-piece"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        animationDuration: `${2 + Math.random() * 3}s`,
                                        backgroundColor: ['#E8932A', '#A6306B', '#2A8F8F', '#D4A84B', '#C45E3E'][Math.floor(Math.random() * 5)]
                                    }}
                                />
                            ))}
                        </div>
                        <div className="confirm-icon">🎉</div>
                        <h2>Order Confirmed!</h2>
                        <p>Your book <strong>"{sampleBook.title}"</strong> is being prepared.</p>
                        <div className="confirm-details">
                            <div className="confirm-row">
                                <span>Format</span>
                                <span>{format.name}</span>
                            </div>
                            <div className="confirm-row">
                                <span>Quantity</span>
                                <span>{quantity}</span>
                            </div>
                            <div className="confirm-row">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                            <div className="confirm-row">
                                <span>Estimated Delivery</span>
                                <span>5-7 business days</span>
                            </div>
                        </div>
                        <p className="confirm-note">A confirmation email has been sent to your inbox.</p>
                        <button className="btn btn-primary" onClick={() => setShowConfirmation(false)}>
                            Done ✓
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
