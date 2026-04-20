import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Sidebar.css';

function Sidebar({ user, history, onLogout, onLoginSuccess, onLoginError, onSelectHistory, isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '◀' : '▶'}
      </button>
      
      <div className="sidebar-content">
        <div className="user-section">
          {user ? (
            <div className="user-info">
              {user.picture && <img src={user.picture} alt={user.name} className="user-pic" />}
              <div className="user-details">
                <p className="user-name">{user.name}</p>
                <button className="logout-btn" onClick={onLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="login-section">
              <p>Log in to save history</p>
              <GoogleLogin
                onSuccess={onLoginSuccess}
                onError={onLoginError}
                useOneTap
              />
            </div>
          )}
        </div>

        <div className="history-section">
          <h3>History</h3>
          {history.length > 0 ? (
            <ul className="history-list">
              {history.map((item) => (
                <li key={item.id} onClick={() => onSelectHistory(item)} className="history-item">
                  <span className="history-prompt">{item.prompt}</span>
                  <span className="history-date">{new Date(item.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-history">No history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
