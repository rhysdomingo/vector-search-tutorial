// src/SubmitSearch.js
import React, { useState } from 'react';

const SubmitSearch = ({ onSearch }) => {
  const [inputText, setInputText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputText">Enter Search:</label>
      <input
        type="text"
        id="inputText"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        required
        className="input-textbox"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitSearch;
