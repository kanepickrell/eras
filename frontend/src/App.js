import React from 'react';
import LBJChat from './LBJChat';
import ChomskyChat from './ChomskyChat';
import NixonChat from './NixonChat';
import Model from './Model';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './style.css';
import './landingStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/lbj" element={<LBJChat />} />
                        <Route path="/models" element={<Model />} />
                        <Route path="/nixon" element={<NixonChat />} />
                        <Route path="/chomsky" element={<ChomskyChat />} />
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
                    <p>Finetuned using GPT-2</p>
                </div>
                <div className="feature">
                    <Link to="/nixon">
                        <h3>Richard Nixon</h3>
                    </Link>
                    <p>Unavailable</p>
                </div>
                <div className="feature">
                    <Link to="/chomsky">
                    <h3>Noam Chomsky</h3>
                    </Link>
                    <p>Finetuned using DialoGPT</p>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>eras<p1>X</p1>change is currently under construction.<br />For my other work please see my site below.</p>
            <a href="https://www.kanepickrel.com" target="_blank" rel="noopener noreferrer">Visit my site</a>
        </footer>
    );
}

export default App;
