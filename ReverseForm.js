// src/ReverseForm.js
import React, { useState } from 'react';

const ReverseForm = ({ onReverse }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReverse(inputText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputText">Enter Text:</label>
      <input
        type="text"
        id="inputText"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        required
      />
      <button type="submit">Reverse</button>
    </form>
  );
};

export default ReverseForm;
