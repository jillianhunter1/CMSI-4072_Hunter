import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";
import Response from "./components/Response";
import Sidebar from "./components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";


function App() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState(null);
  const [similarities, setSimilarities] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Whether the current prompt has already been auto-selected for this response.
  const selectedForResponse = useRef(false);
  const textareaRef = useRef(null);

  const GOOGLE_CLIENT_ID =
    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
    "93600388287-hokvddnuqameqaafi3cbdu1ikaouufad.apps.googleusercontent.com";

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser(null);
    setHistory([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  const fetchHistory = useCallback(async () => {
    if (!token || token === "null" || token === "undefined") return;
    try {
      const res = await axios.get("/api/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
      if (err.response && err.response.status === 401) {
        handleLogout();
      }
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (token) {
      fetchHistory();
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, [token, fetchHistory]);

  // When a response arrives, highlight the whole prompt and keep it selected.
  // The browser holds the selection until the user acts (types, clicks, etc.).
  useEffect(() => {
    if (responses && !loading && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      selectedForResponse.current = true;
    }
  }, [responses, loading]);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("/api/auth/google", {
        credential: credentialResponse.credential,
      });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Login failed", err);
      setError("Google Login failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    setError(null);
    setResponses(null);
    setSimilarities("");
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/prompt",
        { prompt },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setResponses(response.data.responses);
      setSimilarities(response.data.similarities);
      selectedForResponse.current = false;
      if (token) fetchHistory();
    } catch (error) {
      console.error("Error fetching data:", error);
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
    selectedForResponse.current = false;
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptSelect = (e) => {
    // After a response is generated, the first focus/click on the box selects
    // the whole previous prompt so the user can immediately type over it.
    // Only fires once per response, so later clicks can still position the cursor.
    if (responses && !selectedForResponse.current) {
      e.target.select();
      selectedForResponse.current = true;
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div
        className={`App ${responses ? "results-loaded" : ""} ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <Sidebar
          user={user}
          history={history}
          onLogout={handleLogout}
          onLoginSuccess={handleLoginSuccess}
          onLoginError={() => setError("Google Login failed")}
          onSelectHistory={onSelectHistory}
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="main-content">
          <header className="App-header">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">F</span>
              <h1>Fusion</h1>
            </div>
            <p>One prompt, synthesized across the world's leading models.</p>
          </header>
          <form className="prompt-container" onSubmit={handleSubmit}>
            <div className="prompt-box">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                onFocus={handlePromptSelect}
                onClick={handlePromptSelect}
                placeholder="Ask anything — Fusion queries ChatGPT, Claude, and Gemini, then synthesizes the answer."
                disabled={loading}
                autoFocus
              />
              <div className="prompt-actions">
                <span className="prompt-hint">
                  <kbd>Enter</kbd> to send · <kbd>Shift</kbd>+<kbd>Enter</kbd> for a new line
                </span>
                <button type="submit" disabled={loading || !prompt.trim()}>
                  {loading ? (
                    <span className="loader-dots">
                      Synthesizing <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  ) : (
                    "Fuse"
                  )}
                </button>
              </div>
            </div>
          </form>
          {error && <div className="error-message">{error}</div>}
          {responses && !loading && (
            <div className="results-container">
              <div className="similarities">
                <div className="section-heading">
                  <span className="section-badge">Synthesis</span>
                  <h2>Fusion Report</h2>
                </div>
                <div className="synthesis-text">
                  <ReactMarkdown>{similarities}</ReactMarkdown>
                </div>
              </div>
              <div className="responses">
                <div className="responses-heading">
                  <h2 className="responses-title">Source responses</h2>
                  <span className="responses-hint">Click to expand</span>
                </div>
                <Response
                  title="ChatGPT"
                  accent="#10a37f"
                  response={responses.chatGPT}
                />
                <Response
                  title="Claude"
                  accent="#d97757"
                  response={responses.claude}
                />
                <Response
                  title="Gemini"
                  accent="#4285f4"
                  response={responses.gemini}
                />
              </div>
            </div>
          )}
          <footer className="footer">
            Created by Jillian Hunter 
          </footer>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
