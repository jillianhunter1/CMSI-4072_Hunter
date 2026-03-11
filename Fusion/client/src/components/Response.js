import React from 'react';

function Response({ title, response }) {
  return (
    <div className="response-box">
      <h3>{title}</h3>
      <p>{response}</p>
    </div>
  );
}

export default Response;
