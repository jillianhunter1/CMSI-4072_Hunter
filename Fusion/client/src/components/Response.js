import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Response({ title, response }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`response-box ${isOpen ? 'is-open' : ''}`}>
      <button 
        className="response-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3>{title}</h3>
        <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="response-content-wrapper">
        <div className="response-content">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Response;
