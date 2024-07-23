import React from 'react';
import Chat from './Chat';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style.css';
import './landingStyles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/lbj" element={<Chat />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

function LandingPage() {
    return (
        <div className="landing-page">
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
}

function HeroSection() {
    return (
        <section className="hero-section">
            <h1>Welcome to erasXchange</h1>
            <p>A platform for engaging with voices from iconic eras</p>
            <Link to="/models">
                <button className="hero-button">Under The Hood</button>
            </Link>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section className="features-section">
            <h2>Voices</h2>
            <div className="features-container">
                <div className="feature">
                    <Link to="/lbj">
                        <h3>Lyndon Baines Johnson</h3>
                    </Link>
                    <p>Finetuned with GPT-2</p>
                </div>
                <div className="feature">
                    <h3>Richard Nixon</h3>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <h3>Noam Chomsky</h3>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <h3>Virginia Woolf</h3>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <h3>Winston Churchill</h3>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <h3>George Orwell</h3>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <h3>Isaac Newton</h3>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <h3>Marie Curie</h3>
                    <p>Unavailable</p>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>erasXchange is currently under construction.<br />For my other work please see my site below.</p>
            <a href="https://www.kanepickrel.com" target="_blank" rel="noopener noreferrer">Visit my site</a>
        </footer>
    );
}

export default App;
