import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://18.227.105.29:8000/")
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>{message}</h1>
            </header>
        </div>
    );
}

export default App;

