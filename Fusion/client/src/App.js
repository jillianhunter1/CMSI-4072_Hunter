import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState(null);
  const [similarities, setSimilarities] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/prompt', { prompt });
      setResponses(response.data.responses);
      setSimilarities(response.data.similarities);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fusion</h1>
        <p>Enter a prompt and see the combined power of AI</p>
      </header>
      <div className="prompt-container">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {responses && (
        <div className="results-container">
          <div className="responses">
            <h2>Responses</h2>
            <div className="response-box">
              <h3>ChatGPT</h3>
              <p>{responses.chatGPT}</p>
            </div>
            <div className="response-box">
              <h3>Claude</h3>
              <p>{responses.claude}</p>
            </div>
            <div className="response-box">
              <h3>Gemini</h3>
              <p>{responses.gemini}</p>
            </div>
          </div>
          <div className="similarities">
            <h2>Similarities</h2>
            <p>{similarities}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
