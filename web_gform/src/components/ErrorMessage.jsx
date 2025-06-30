// src/components/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <p className="text-error text-sm mt-1 text-left">
      {message}
    </p>
  );
};

export default ErrorMessage;