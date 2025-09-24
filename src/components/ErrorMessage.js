import React from 'react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
};

export default ErrorMessage;
