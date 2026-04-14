import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ReactMarkdown from 'react-markdown';
import Response from './components/Response';

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState(null);
  const [similarities, setSimilarities] = useState('');
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setError(null);
    setResponses(null);
    setSimilarities('');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/prompt', { prompt });
      setResponses(response.data.responses);
      setSimilarities(response.data.similarities);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`An error occurred while fetching data. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError(null);
  }

  return (
    <div className={`App ${responses ? 'results-loaded' : ''}`}>
      <header className="App-header">
        <h1>Fusion</h1>
        <p>Harness the combined power of AI</p>
      </header>
      <form className="prompt-container" onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Type your prompt here..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="loader-dots">
              Thinking <span></span><span></span><span></span>
            </span>
          ) : 'Fuse Answers'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {responses && !loading && (
        <div className="results-container">
          <div className="similarities">
            <h2>Fusion Report</h2>
            <div className="synthesis-text">
              <ReactMarkdown>{similarities}</ReactMarkdown>
            </div>
          </div>
          <div className="responses">
            <h2>Source Insights</h2>
            <Response title="ChatGPT" response={responses.chatGPT} />
            <Response title="Claude" response={responses.claude} />
          </div>
        </div>
      )}
      <footer className="footer">
        Created by Jillian Hunter for CMSI 4072
      </footer>
    </div>
  );
}

export default App;
