import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function Response({ title, response, accent }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`response-box ${isOpen ? 'is-open' : ''}`}
      style={accent ? { '--accent': accent } : undefined}
    >
      <button
        className="response-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="response-title">
          <span className="response-dot" aria-hidden="true" />
          <h3>{title}</h3>
        </span>
        <span className="toggle-icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
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
