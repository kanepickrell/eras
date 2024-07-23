import React from 'react';
import Chat from './Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css'; // Make sure this line is uncommented to include your styles

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={
                            <div className="centered-content">
                                <p className="centered-text">
                                    erasXchange is currently under construction.<br />For my other work please see my site below.
                                </p>
                                <a
                                    className="centered-link"
                                    href="https://www.kanepickrel.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Go to kanepickrel.com
                                </a>
                            </div>
                        } />
                        <Route path="/lbj" element={<Chat />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
