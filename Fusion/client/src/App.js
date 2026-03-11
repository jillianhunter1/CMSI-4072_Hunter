import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Response from './components/Response';

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState(null);
  const [similarities, setSimilarities] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponses(null);
    setSimilarities('');
    try {
      const response = await axios.post('http://localhost:3001/api/prompt', { prompt });
      setResponses(response.data.responses);
      setSimilarities(response.data.similarities);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`An error occurred while fetching data: ${error.message}. Please check the console for more details.`);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fusion</h1>
        <p>Enter a prompt and see the combined power of AI</p>
      </header>
      <form className="prompt-container" onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt here"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {responses && (
        <div className="results-container">
          <div className="responses">
            <h2>Responses</h2>
            <Response title="ChatGPT" response={responses.chatGPT} />
            <Response title="Claude" response={responses.claude} />
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
