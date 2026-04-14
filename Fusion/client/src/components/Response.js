import React from 'react';
import ReactMarkdown from 'react-markdown';

function Response({ title, response }) {
  return (
    <div className="response-box">
      <h3>{title}</h3>
      <div className="response-content">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Response;
