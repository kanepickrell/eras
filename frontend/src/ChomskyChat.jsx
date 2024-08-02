import React, { useState, useRef, useEffect, useCallback } from 'react';
// import './ChomskyStyle.css';
import './ChatStyle.css'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import { SpinnerRoundFilled, SpinnerDotted } from 'spinners-react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const ChomskyChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);
  const [typingMessage, setTypingMessage] = useState('');
  const [isLLMResponding, setIsLLMResponding] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [model, setModel] = useState('models--lbjPT2-kgp'); // Default model
  const modelNames = {
    'models--lbjPT2-kgp': 'LBJ-2',
    'models--lbjPT3-kgp': 'LBJ-3'
  };
  const [showSidebar, setShowSidebar] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const getMessageStyle = (isUser) => {
    return {
      backgroundColor: isUser ? '#81b89f' : 'rgba(158, 172, 57, 1)',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      color: 'white',
      padding: '20px',
      margin: '10px 0',
      borderRadius: '10px',
      maxWidth: '70%',
      wordWrap: 'break-word',
    };
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, isUser: true }]);
      setInput('');
      setShowSpinner(true);

      // Send the request to the backend
      try {
        const response = await fetch('https://erasxchange.com/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: input,
            model_name: model,
            max_length: 50
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (audioEnabled) {
            await generateAudio(data.response);
          }
          setIsLLMResponding(true);
          typeWriterEffect(` Noam Chomsky: ${data.response}`);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'Error: Unable to get a response from the backend.', isUser: false }]);
        }
      } catch (error) {
        setMessages((prevMessages) => [...prevMessages, { text: 'Error: Unable to get a response from the backend.', isUser: false }]);
      } finally {
        setShowSpinner(false);
      }
    }
  };

  const generateAudio = async (text) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('https://erasxchange.com/generate_audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, id: "aWP6LNsJpqYVer2st2CX" })
        });

        if (response.ok) {
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.onplay = () => resolve();
          audio.play().catch(error => {
            console.error(`Error playing audio: ${error}`);
            setMessages((prevMessages) => [...prevMessages, { text: 'Error: Kane, Unable to play the audio.', isUser: false }]);
            reject();
          });
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: 'Error: Unable to generate audio.', isUser: false }]);
          reject();
        }
      } catch (error) {
        setMessages((prevMessages) => [...prevMessages, { text: 'Error: Unable to generate audio.', isUser: false }]);
        reject();
      }
    });
  };

  const typeWriterEffect = useCallback((text) => {
    let i = 0;
    setTypingMessage('');

    function typeWriter() {
      if (i < text.length) {
        setTypingMessage((prev) => prev + text.charAt(i));
        i++;
        setTimeout(typeWriter, 50);
      } else {
        setMessages((prevMessages) => [...prevMessages, { text, isUser: false }]);
        setTypingMessage('');
        setIsLLMResponding(false);
      }
    }
    typeWriter();
  }, []);

  const autoScroll = () => {
    const chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, typingMessage]);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  const handleToggleAudio = () => setAudioEnabled(!audioEnabled);

  return (
    <div className={`chat-container ${showSidebar ? 'sidebar-shown' : ''}`}>
      <div onClick={handleSidebarToggle} className="toggle-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-layout-sidebar" viewBox="0 0 16 16" stroke="currentColor" strokeWidth=".5">
          <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" />
        </svg>
      </div>

      <Offcanvas show={showSidebar} onHide={handleSidebarToggle} className="tomato-sidebar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ErasXchange</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Dropdown as={ButtonGroup} style={{ padding: '20px', fontWeight: 'bolder' }}>
            <Button variant="success" style={{ backgroundColor: 'gray', border: 'none' }}>
              {modelNames[model]}
            </Button>
            <Dropdown.Toggle split variant="success" style={{ backgroundColor: 'gray', border: 'none' }} id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setModel('models--lbjPT2-kgp')}>LBJ-2</Dropdown.Item>
              <Dropdown.Item onClick={() => setModel('models--lbjPT3-kgp')}>LBJ-3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button onClick={handleToggleAudio} variant={audioEnabled ? "danger" : "success"}>
            {audioEnabled ? "Disable Voice" : "Enable Voice"}
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      <div id="chat-box" className="chat-box" ref={chatBoxRef} style={{ flex: 1, overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className="message" 
            style={{ 
              backgroundColor: msg.isUser ? '#81b89f' : '#f28b82',  // Soft red color for LLM responses
              alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
              color: 'white',
              padding: '20px',
              margin: '10px 0',
              borderRadius: '10px',
              maxWidth: '70%',
              wordWrap: 'break-word',
            }}
          >
            {msg.text}
          </div>
        ))}
        {typingMessage && (
          <div 
            className="message llm-message" 
            style={{ 
              backgroundColor: '#f28b82',  // Ensure the typing message also uses the soft red color
              alignSelf: 'flex-start',
              color: 'white',
              padding: '20px',
              margin: '10px 0',
              borderRadius: '10px',
              maxWidth: '70%',
              wordWrap: 'break-word',
            }}
          >
            {typingMessage}
          </div>
        )}
      </div>


      {showSpinner ? (
        // <div className="spinner-container">
        //   <SpinnerRoundFilled size={75} thickness={180} speed={60} color="rgba(57, 136, 172, 1)" />
        // </div>
        <div className="spinner-container">
            <SpinnerDotted size={75} thickness={180} speed={60} color="#f28b82" />
        </div>
      ) : isLLMResponding && (
        <div className="sound-icon">
          <div className="sound-wave">
            {[...Array(20)].map((_, i) => (
              <i key={i} className="bar"></i>
            ))}
          </div>
        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Ask Professor Chomsky..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Chat</button>
      </div>
    </div>
  );
};

export default ChomskyChat;
