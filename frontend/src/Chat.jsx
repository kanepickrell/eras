import React, { useState } from 'react';
import './style.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [model, setModel] = useState('models--lbjPT2-kgp');  // Default model

    const modelNames = {
        'models--lbjPT2-kgp': 'LBJ-2',
        'models--lbjPT3-kgp': 'LBJ-3'
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;

        const newMessage = `You: ${userInput}`;
        setMessages([...messages, newMessage]);

        // Clear input
        setUserInput('');

        // Trigger the background fade animation
        const chatContainer = document.getElementById('chat-container');
        chatContainer.classList.remove('fade-effect'); // Reset animation
        void chatContainer.offsetWidth; // Trigger reflow to restart animation
        chatContainer.classList.add('fade-effect');

        // Auto-scroll to the bottom of the chat box
        autoScroll();

        // Log the selected model to the console
        console.log(`Selected model: ${model}`);

        // Send the request to the backend
        try {
            const response = await fetch('https://erasxchange.com/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: userInput,
                    model_name: model,
                    max_length: 150
                })
            });

            if (response.ok) {
                const data = await response.json();
                typeWriterEffect(`President Johnson: ${data.response}`);
                generateAudio(data.response);
            } else {
                setMessages([...messages, 'Error: Unable to get a response from the backend.']);
            }
        } catch (error) {
            setMessages([...messages, 'Error: Unable to get a response from the backend.']);
        }
    };

    const generateAudio = async (text) => {
        try {
            const response = await fetch('https://erasxchange.com/generate_audio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (response.ok) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                playAudio(audioUrl);
            } else {
                setMessages([...messages, 'Error: Unable to generate audio.']);
            }
        } catch (error) {
            setMessages([...messages, 'Error: Unable to generate audio.']);
        }
    };

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play().catch(error => {
            console.error(`Error playing audio: ${error}`);
            setMessages([...messages, 'Error: Kane, Unable to play the audio.']);
        });
    };

    const typeWriterEffect = (text) => {
        const chatBox = document.getElementById('chat-box');
        
        // Add a blank line or a space before the response
        const blankLine = document.createElement('div');
        blankLine.innerHTML = '<br>'; // This creates a blank line
        chatBox.appendChild(blankLine);

        const responseDiv = document.createElement('div');
        chatBox.appendChild(responseDiv);

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                responseDiv.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 25); // Adjust the delay for typing speed
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll as text is added
            } else {
                // Add another blank line after the response message if needed
                const blankLineAfter = document.createElement('div');
                blankLineAfter.innerHTML = '<br>';
                chatBox.appendChild(blankLineAfter);

                autoScroll();
            }
        }
        typeWriter();
    };

    const autoScroll = () => {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    return (
        <div>
            <header>
                {/* <h1 className="metrophobic-regular" style={{ paddingLeft: '20px', fontWeight: 'bolder' }}>LBJ Chat</h1> */}
                <Dropdown as={ButtonGroup} style={{ padding: '20px', fontWeight: 'bolder' }}>
                    <Button variant="success" style={{ backgroundColor: 'rgba(255, 99, 71, 0.8)', border: 'none' }}>
                        {modelNames[model]}
                    </Button>
                    <Dropdown.Toggle split variant="success" style={{ backgroundColor: 'rgba(255, 99, 71, 0.8)', border: 'none' }} id="dropdown-split-basic" />
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setModel('models--lbjPT2-kgp')}>LBJ-2</Dropdown.Item>
                        <Dropdown.Item onClick={() => setModel('models--lbjPT3-kgp')}>LBJ-3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </header>
            <main id="chat-container" className="metrophobic-regular">
                <div id="chat-box" className="metrophobic-regular">
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <input
                    type="text"
                    id="user-input"
                    placeholder="Ask President Johnson..."
                    autoComplete="off"
                    className="metrophobic-regular"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <button
                    id="send-btn"
                    className="metrophobic-regular"
                    onClick={sendMessage}
                >
                    Chat
                </button>
            </main>
        </div>
    );
}

export default Chat;
