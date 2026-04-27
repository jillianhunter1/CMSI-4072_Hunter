import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ReactMarkdown from 'react-markdown';
import Response from './components/Response';
import Sidebar from './components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState(null);
  const [similarities, setSimilarities] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "93600388287-hokvddnuqameqaafi3cbdu1ikaouufad.apps.googleusercontent.com";

  useEffect(() => {
    if (token) {
      fetchHistory();
      const savedUser = localStorage.getItem('user');
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, [token]);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post('/api/auth/google', {
        credential: credentialResponse.credential,
      });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.error('Login failed', err);
      setError('Google Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setHistory([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;
    
    setError(null);
    setResponses(null);
    setSimilarities('');
    setLoading(true);
    try {
      const response = await axios.post('/api/prompt', 
        { prompt },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setResponses(response.data.responses);
      setSimilarities(response.data.similarities);
      if (token) fetchHistory();
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`An error occurred while fetching data. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const onSelectHistory = (item) => {
    setPrompt(item.prompt);
    setResponses({
      chatGPT: item.chatGPTResponse,
      claude: item.claudeResponse,
      gemini: item.geminiResponse,
    });
    setSimilarities(item.similarities);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError(null);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className={`App ${responses ? 'results-loaded' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar 
          user={user} 
          history={history} 
          onLogout={handleLogout}
          onLoginSuccess={handleLoginSuccess}
          onLoginError={() => setError('Google Login failed')}
          onSelectHistory={onSelectHistory}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="main-content">
          <header className="App-header">
            <h1>Fusion</h1>
            <p>Harness the combined power of AI</p>
          </header>
          <form className="prompt-container" onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your prompt here..."
              disabled={loading}
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <span className="loader-dots">
                  Thinking <span></span><span></span><span></span>
                </span>
              ) : 'Fuse'}
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
                <Response title="Gemini" response={responses.gemini} />
              </div>
            </div>
          )}
          <footer className="footer">
            Created by Jillian Hunter | CMSI 4072
          </footer>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
